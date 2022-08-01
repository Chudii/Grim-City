const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const allOptionButtons = document.getElementsByClassName('.btn')

let state = {}
let letterIndex = 0
let currentPhrase = []
let isEnd = false

const startGame = () => {
    state = {}
    showTextNode(1)
}

const typewrite = (textNode) => {
    console.log('type writing')
    if (currentPhrase.length <= textNode.text.length) {
        textElement.innerText = currentPhrase.join('')
        if (letterIndex <= textNode.text.length) {
            currentPhrase.push(textNode.text[letterIndex])
            letterIndex++
        }
    } else {
        letterIndex = 0
        currentPhrase = []
        textNode.options.forEach(option => {
            if (showOption(option)) {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add('btn')
                button.addEventListener('click', () => selectOption(option))
                optionButtonsElement.appendChild(button)
            }
        })
        return
    }
    setTimeout(() => {
        typewrite(textNode)
    }, 35)
}

const showTextNode = (textNodeIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    if (textNodeIndex != 1) {
        typewrite(textNode)
    } else {
        textElement.innerText = textNode.text
        textNode.options.forEach(option => {
            if (showOption(option)) {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add('btn')
                button.addEventListener('click', () => selectOption(option))
                optionButtonsElement.appendChild(button)
            }
        })
    }
    

    
}

const showOption = (option) => {
    return option.requiredState == null || option.requiredState(state)
}

const selectOption = (option) => {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0 ) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of (first item) near you.',
        options: [
            { text: 'Take (first item)', setState: {firstItem: true}, nextText: 2 },
            { text: 'Leave (first item)', nextText: 2 },
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            { text: 'Trade the (first item) for the (second item)', requiredState: (currentState) => currentState.firstItem, setState: { firstItem: false, secondItem: true }, nextText: 3 },
            { text: 'Trade the (first item) for the (third item)', requiredState: (currentState) => currentState.firstItem, setState: { firstItem: false, thirdItem: true }, nextText: 3 },
            { text: 'Ignore the merchant', nextText: 3 }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            { text: 'Explore the castle', nextText: 4 },
            { text: 'Find some hay in a stable to sleep in', nextText: 5 },
            { text: 'Find a room to sleep at in the town', nextText: 6}
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options: [
            { text: 'Restart', nextText: -1 }
        ]
    },
    {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep tthe owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
            { text: 'Restart', nextText: -1 }
        ]
    }
]

startGame()