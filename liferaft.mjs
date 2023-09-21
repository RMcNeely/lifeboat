addPersonToLiferaft()

async function addPersonToLiferaft() {
    const PEOPLE = await fetchPeople()

    const entries = Object.entries(PEOPLE)
    for (const entry of entries) {
        const [ name, data ] = entry
        createPersonCard({ name, ...data })
    }
}

function createPersonCard(person) {
    const TEMPLATE = document.querySelector("template#people")
    const holder = document.querySelector('section.people-list')
    
    const node = TEMPLATE.content.cloneNode(true);
    const infoHolder = node.querySelector('div.info')

    const nameNode = document.createElement('h4')
    nameNode.innerText = person.name;
    node.querySelector('summary').append(nameNode);

    node.querySelector('.bio').innerText = person.bio ?? ''
    node.querySelector('span.title').innerText = person.jobTitle ?? ''
    
    if (person.email) {
        const link = document.createElement('A')
        link.href = `mailto:${person.email}`
        link.innerText = person.email
        node.querySelector('span.email').append(link)
    } else {
        node.querySelector('span.email').innerText = 'Not available'
    }


    for (const linkdata of Object.entries(person.links)) {
        const [ name, url ] = linkdata
        
        const nameSpan = document.createElement('SPAN')
        const urlSpan = document.createElement('SPAN')
        const link = document.createElement('A')
    

        nameSpan.innerText = name;
        nameSpan.classList.add('social-link')
        urlSpan.append(link)
        link.href = url
        link.innerText = url;
        infoHolder.insertBefore(nameSpan, infoHolder.lastElementChild.nextElementSibling)
        infoHolder.insertBefore(urlSpan, infoHolder.lastElementChild.nextElementSibling)
    }


    holder.appendChild(node)
}

async function fetchPeople() {
    const PEOPLE_FETCH = await fetch('people.json').catch((err) => {
        console.error(`Error fetching people from the server! Refresh the page to try again.\n${err}`)
    })
    const PEOPLE = await PEOPLE_FETCH.json().catch((err) => {
        console.error(`Error parsing JSON file from the server! Refresh the page to try again.\n${err}`)
    })
    return PEOPLE;
}