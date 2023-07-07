interface IPlantSheet {
  id: number,
  name: string,
  otherNames: string,
  lightNum: number,
  lightText: string,
  waterNum: number,
  waterText: string,
  toxic: boolean,
  toxicText: string,
  photoURL: string,
  soilText: string,
  repottingText: string,
  fertilizationText: string,
}

export { IPlantSheet };