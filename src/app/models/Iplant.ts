import { IPlantSheet } from "./IPlantSheet";

interface IPlant {
  id: number,
  name: string,
  place: string,
  infoId: number,
  userId: number,
  sheet: IPlantSheet | undefined,
}

export { IPlant };