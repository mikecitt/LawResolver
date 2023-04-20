import re
from typing import List
import fitz

from os import listdir
from jinja2 import Environment, FileSystemLoader
environment = Environment(loader=FileSystemLoader("templates/"))
template = environment.get_template("judgement.jinja")

FOLDER_PATH = r''


def process_pdf(pdf_path: str):
    with fitz.open(pdf_path) as doc:
        metadata = get_metadata(doc[0].get_text())
        full_text = ' '.join([a.get_text() for a in doc])

    return metadata, full_text


def get_metadata(text: str):
    text = ' '.join(text.split())
    text = text.replace('P R E S U D U', 'PRESUDU')
    metadata = {
        'number': re.findall(r'K.? \d+/\d{4}', text)[0],
        'organization': re.findall(r'U IME CRNE GORE (.*?),', text)[0],
        'judges': ''.join(re.findall(r'(sudij. .*?) uz|(sudij. .*?) sa', text)[0]),
        'editor': get_full_names(''.join(re.findall(r'uz učešće (.*?),|zapisničarem (.*?),', text)[0]))[0],
        'parties': get_parties(text),
        'date': re.findall(r'(\d{2}[.]\d{2}[.]\d{4}[.]).* PRESUDU', text)[0]
    }

    metadata['judges'] = get_full_names(metadata['judges'])
    metadata['lawyers'] = get_lawyers(text, metadata['parties'])
    return metadata


def format_metadata(metadata):
    metadata['sud'] = {
        'code': ''.join([w[0].lower() for w in metadata['organization'].split()]),
        'full_name': metadata['organization']
    }

    metadata['persons'] = []
    for judge in metadata['judges']:
        metadata['persons'].append({
            'name': judge.split()[0].lower(),
            'type': '/judge',
            'full_name': judge
        })

    metadata['persons'].append({
        'name': metadata['editor'].split()[0].lower(),
        'type': '/editor',
        'full_name': metadata['editor']
    })
    for party in metadata['parties']:
        metadata['persons'].append({
            'name': party.lower().replace('.', '').replace(' ', ''),
            'type': '',
            'full_name': party
        })

    date_split = metadata['date'].split('.')
    metadata['date'] = f'{date_split[2]}-{date_split[1]}-{date_split[0]}'

def get_full_names(text: str):
    full_names = []
    full_name = []
    for word in text.split():
        if word[0].isupper():
            full_name.append(word)
        elif len(full_name) != 0:
            full_names.append(' '.join(full_name).replace(',', ''))
            full_name = []
    
    if len(full_name) != 0:
        full_names.append(' '.join(full_name).replace(',', ''))
    return full_names


def get_parties(text: str):
    text = text[:text.index("PRESUDU")]
    text = re.sub(r'advokat[ai]? (.*?) (branioc[ai]|branilaca?|k)|bran[ie] (.*?) advokat[ai]?', '', text)
    text = re.sub(r'iz [A-ZČĆŠĐŽ][.] ?[A-ZČĆŠĐŽ][.]', '', text)
    return list(set(re.findall(r'[A-ZČĆŠĐŽ][.] ?[A-ZČĆŠĐŽ][.]', text)))
    

def get_lawyers(text: str, replace_values: List['str']):
    text = text[:text.index("PRESUDU")]
    temp = '|'.join(list(map(lambda x: x.replace('.', '\.'), replace_values)))
    text = re.sub(r'iz [A-ZČĆŠĐŽ][.] ?[A-ZČĆŠĐŽ][.]', '', text)
    text = re.sub(rf'{temp}', '', text)
    return list(set(re.findall(r'[A-ZČĆŠĐŽ][.] ?[A-ZČĆŠĐŽ][.]', text)))


def set_references(metadata, text: str):
    org_replace = '<organization id="{}" refersTo="#{}">{}</organization>'
    org_replace = org_replace.format(
        metadata["sud"]["code"], 
        metadata["sud"]["code"], 
        metadata["sud"]["full_name"]
    )
    text = text.replace(metadata['organization'], org_replace)
    for person in metadata['persons']:
        replace = '<party id="{}" refersTo="{}" as="{}">{}</party>'
        replace = replace.format(
            person['name'],
            person['name'],
            person['type'],
            person['full_name'],
        )
        text = text.replace(person['full_name'], replace)

    return text

def get_all_cases():
    return list(filter(lambda x: x.startswith('KZ') , listdir(FOLDER_PATH)))


def generate_jinja(file_name, metadata, text):
    content = template.render(
        author=metadata['organization'],
        date=metadata['date'],
        number=metadata['number'],
        sud=metadata['sud'],
        persons=metadata['persons'],
        body=text
    )
    with open(file_name.replace('pdf', 'xml'), mode="w", encoding="utf-8") as results:
        results.write(content)

if __name__ == '__main__':
    all_cases_path = get_all_cases()
    for case_path in all_cases_path:
        metadata, text = process_pdf(f'{FOLDER_PATH}\{case_path}')
        format_metadata(metadata)
        text = set_references(metadata, text)
        generate_jinja(case_path, metadata, text)
