import ghpLogo from '/gwchp-logo-coloured-600x600.png'
import { addChoiceModalLink } from './utils'

export function showPhotoArchive() {
    return `
    <a id="ghp-link" href="#" target="_blank" class="flex-item">
        <img src="${ghpLogo}" class="logo green" alt="Grampound Heritage Project logo" />
        <p>Grampound Heritage Project photo archive.</p>
    </a>
    `
}

addChoiceModalLink('ghp-link')