import ghpLogo from '/gwchp-logo-coloured-600x600.png'
import { addChoiceModalLink } from './utils'

export function showPhotoArchive() {
    return `
        <img src="${ghpLogo}" class="logo green" alt="Grampound Heritage Project logo" />
        <p>Grampound Heritage Project photo archive.</p>
    `
}

addChoiceModalLink('ghp-link', 'Photo Archive', ([
    { text: 'Photo search', url: 'https://photos.grampound.org.uk/photos.php' },
    { text: 'Slide show', url: 'https://photos.grampound.org.uk/slideshow.php' }
]));