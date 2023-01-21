import { MainProvider } from '../providers/MainProvider'

export const Model = {

  create: function () {
    return this
  },

  events: {
    DATA_REQUESTED: new ApplicationEvent(),
    INVENTORY_REFRESHED: new ApplicationEvent(),
    DATA_REFRESH_FAILED: new ApplicationEvent(),
    DATA_REQUEST_FINISHED: new ApplicationEvent(),
    INVENTORY_REMOVED: new ApplicationEvent(),
    INVENTORY_REMOVE_FAILED: new ApplicationEvent()
  },

  branch_ids: [],

  begin_date: objUI.FORMAT_DATE(new Date()),

  end_date: objUI.FORMAT_DATE(new Date()),

  inventory: [],

  async load_data() {
    if (!this.branch_ids || !this.begin_date || !this.end_date) return
    this.events.DATA_REQUESTED.notify()
    try {
      this.inventory = await MainProvider.get_data(this.branch_ids, this.begin_date, this.end_date)
      this.events.INVENTORY_REFRESHED.notify(this.inventory)
    } catch (e) {
      this.events.DATA_REFRESH_FAILED.notify()
    } finally {
      this.events.DATA_REQUEST_FINISHED.notify()
    }
  },

  set_branch_ids(branch_ids) {
    this.branch_ids = branch_ids
  },

  set_model_date(begin_date, end_date) {
    this.begin_date = begin_date
    this.end_date = end_date
  },

  /**
   * Метод удаления инвентаризации
   * @param {Number} item - Идентификатор инвентаризации 
   */
  async delete_inventory(item) {
    try {
      const param = {
        inventory_title_id: item.inventory_title_id
      }
      await MainProvider.delete_inventory(param)
      this.events.INVENTORY_REMOVED.notify()
    } catch (e) {
      this.events.INVENTORY_REMOVE_FAILED.notify(e)
    }
  },
}
