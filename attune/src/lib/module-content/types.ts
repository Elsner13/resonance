export interface ModuleSection {
  heading: string
  body: string[]
}

export interface ModuleContent {
  sections: ModuleSection[]
  theMove: string
}
