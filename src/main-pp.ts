import './app.css'
import PrivacyPolicy from './lib/PrivacyPolicy.svelte'

const pp = new PrivacyPolicy({
  target: document.getElementById('pp')!,
})

export default pp
