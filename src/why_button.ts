import { submitLog } from './utils'

const WHY_BUTTON_ID = 'why-button'

export function showWhyButton() {
    return `
    <li class="flex-item">
        <button class="widgetlink" id="${WHY_BUTTON_ID}">
            Why?
        </button>
        <p id="why-content">Keep hitting the why button to learn more.</p>
    </li>
    `
}

// shuffle array function
function shuffleArray(array: string[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

// Add event listener for why-button to update why-content with a random reason
document.addEventListener('DOMContentLoaded', () => {
    const WHY_SENTENCES = [
        "To help us find useful local information quickly.",
        "To demonstrate how open data and digital tools can benefit our community.",
        "To make environmental and travel data more accessible for Grampound.",
        "To encourage us to engage with local resources and events.",
        "To provide a single place for maps, weather, air and water quality, and more.",
        "To support transparency and awareness about local environmental conditions.",
        "To experiment with digital projects for rural areas.",
        "To make it easier to plan journeys and walks around Grampound.",
        "To showcase how technology can connect people with their local area.",
        "To encourage contributions and improvements from anyone who wants to get involved.",
        "To share some excellent digital resources that already exist for Grampound.",
        "To show what is possible with open data and community effort.",
        "To demonstrate how small digital projects can beat 'big tech' for local relevance.",
        "This could be a public touch screen in the village hall or shop.",
        "To help everyone find local info fast.",
        "To show how sharing info online can help our town.",
        "To make weather and nature facts easy to find for Grampound.",
        "To get people excited about local events and places.",
        "To have one website for maps, weather, and how clean our air and water is.",
        "To be honest and open about our local environment.",
        "To try out new tech ideas for places like ours.",
        "To make planning walks and trips around Grampound simple.",
        "To show how tech can help people connect with where they live.",
        "To share other cool websites that already exist for Grampound.",
        "To show what we can do when we share information and work together.",
        "To prove a small local website can be more useful than big websites or apps for our town.",
        "This could also be a public computer screen in the village hall or shop.",
        "To find out what's happening in the village this week.",
        "To prove a local site can be more useful than big tech apps.",
        "To make planning walks, bus trips, and journeys simpler.",
        "To be the one-stop website for everything in Grampound.",
        "To help you find local info quickly and easily.",
        "To show what we can achieve when we share information and work together.",
        "To demonstrate 'digital sovereignty' - that small local projects can beat big tech.",
    ];
    const WHY_BUTTON = document.getElementById(WHY_BUTTON_ID);
    const WHY_CONTENT = document.getElementById('why-content');
    let whySentencesCopy = [...WHY_SENTENCES];
    let whyText = "";
    shuffleArray(whySentencesCopy);
    let whyButtons = Array('Why again?', 'But why?', 'Why though?', 'Please, why?', 'Why, why, why?', 'But really?')
    if (WHY_BUTTON && WHY_CONTENT) {
        WHY_BUTTON.addEventListener('click', () => {

            if (whySentencesCopy.length > 0) {
                whyText = whySentencesCopy.pop() || "";
            } else {
                submitLog('Why sentences exhausted, reshuffling');
                whySentencesCopy = [...WHY_SENTENCES];
                shuffleArray(whySentencesCopy);
                whyText = whySentencesCopy.pop() || "";
            }
            WHY_BUTTON.innerText = whyButtons[Math.floor(Math.random() * whyButtons.length)];
            WHY_CONTENT.innerText = whyText;
            submitLog('Why button clicked: ', whyText);
        });
    }
});


