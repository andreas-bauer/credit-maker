import './style.css'
import Alpine from 'alpinejs'
import { createContributor, allCreditRoles } from './credit/credit.js'
import generateOutput from './credit/generator.js'

window.alpine = Alpine
window.createContributor = createContributor
window.allCreditRoles = allCreditRoles
window.generateOutput = generateOutput

Alpine.start()
