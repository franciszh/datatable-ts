import { RootState } from './itemsStore'

export const selectGUID = (state: RootState) => state.itemSelected.guid
