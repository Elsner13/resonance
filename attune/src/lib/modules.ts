import { module1Content } from './module-content/module-1'
import { module2Content } from './module-content/module-2'
import { module3Content } from './module-content/module-3'
import { module4Content } from './module-content/module-4'
import { module5Content } from './module-content/module-5'
import { module6Content } from './module-content/module-6'
import { module7Content } from './module-content/module-7'
import { module8Content } from './module-content/module-8'

export interface ModuleSection {
  heading: string
  body: string[]
}

export interface Module {
  num: string
  slug: string
  title: string
  subtitle: string
  sections: ModuleSection[]
  theMove: string
}

export const modules: Module[] = [
  {
    num: '01',
    slug: 'module-1',
    title: 'The Wrong Problem',
    subtitle: 'Why you\'re not getting better at the rate you should',
    ...module1Content,
  },
  {
    num: '02',
    slug: 'module-2',
    title: 'How Skill Actually Happens',
    subtitle: 'The mechanism underneath every expert performance',
    ...module2Content,
  },
  {
    num: '03',
    slug: 'module-3',
    title: 'What Your Environment Is Doing to You',
    subtitle: 'Skill doesn\'t live inside you — it lives in the loop between you and your context',
    ...module3Content,
  },
  {
    num: '04',
    slug: 'module-4',
    title: 'The Constraints That Are Running You',
    subtitle: 'The hidden forces shaping your performance ceiling',
    ...module4Content,
  },
  {
    num: '05',
    slug: 'module-5',
    title: 'Repetition Without Repetition',
    subtitle: 'Why perfect practice doesn\'t produce experts',
    ...module5Content,
  },
  {
    num: '06',
    slug: 'module-6',
    title: 'Designing the Bowl',
    subtitle: 'How to structure conditions that demand your best',
    ...module6Content,
  },
  {
    num: '07',
    slug: 'module-7',
    title: 'Representative Practice',
    subtitle: 'Closing the gap between how you practice and how you perform',
    ...module7Content,
  },
  {
    num: '08',
    slug: 'module-8',
    title: 'The Perceptual Shift',
    subtitle: 'What changes when the work finally lands',
    ...module8Content,
  },
]

export function getModule(slug: string): Module | undefined {
  return modules.find(m => m.slug === slug)
}

export function getNextModule(slug: string): Module | undefined {
  const currentIndex = modules.findIndex(m => m.slug === slug)
  if (currentIndex === -1 || currentIndex === modules.length - 1) return undefined
  return modules[currentIndex + 1]
}
