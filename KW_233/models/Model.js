import { Provider } from '../providers/Provider'

export const Model = {

  create: function () {
    return this
  },

  events: {
    BRANCH_CHANGED: new ApplicationEvent(),
    DATA_REQUESTED: new ApplicationEvent(),
    INVENTORY_REFRESHED: new ApplicationEvent(),
    DATA_REFRESH_FAILED: new ApplicationEvent(),
    DATA_REQUEST_FINISHED: new ApplicationEvent(),
    SELECTED_PROGRAM_CHANGED: new ApplicationEvent(),
    COMMISSION_CHAIRMAN_REFRESHED: new ApplicationEvent(),
    COMMISSION_MEMBERS_REFRESHED: new ApplicationEvent(),
    FRP_REFRESHED: new ApplicationEvent(),
  },

  balances_filter_ids: {
    ALL: '1',
    SURPLUS: '2',
    SHORTAGE: '3',
    ALL_DISCREPANCIES: '4'
  },

  params: {},
  commission_chairman: {},
  commission_members: [],
  frp: [],
  branch_id: undefined,
  begin_date: objUI.FORMAT_DATE(new Date()),
  end_date: objUI.FORMAT_DATE(new Date()),
  analyse_begin_week_date: undefined,
  inventory: [],
  filter_text: '',
  balances_filter_id: -1,

  set_params(params) {
    this.params = params
  },

  get_params() {
    return this.params
  },

  async load_data() {
    if (!this.analyse_branch_id || !this.analyse_begin_week_date) return
    this.events.DATA_REQUESTED.notify()
    try {
      this.inventory = await Provider.get_data(this.params)
      this.events.INVENTORY_REFRESHED.notify(this.get_text_filtered_goods())
    } catch (e) {
      this.events.DATA_REFRESH_FAILED.notify()
    } finally {
      this.events.DATA_REQUEST_FINISHED.notify()
    }
  },

  async load_commission_chairman() {
    this.commission_chairman = await Provider.get_commission_chairman(this.params)
    this.events.COMMISSION_CHAIRMAN_REFRESHED.notify()
  },

  async load_commission_members() {
    this.commission_members = await Provider.get_commission_members(this.params)
    this.events.COMMISSION_MEMBERS_REFRESHED.notify()
    console.log(this.commission_members)
  },

  async load_frp() {
    this.frp = await Provider.get_frp(this.params)
    this.events.FRP_REFRESHED.notify()
  },

  set_branch_id(id) {
    this.branch_id = id
    this.events.BRANCH_CHANGED.notify()
  },

  set_model_date(begin_date, end_date) {
    this.begin_date = begin_date
    this.end_date = end_date
  },

  set_filter_text(filter_text) {
    this.filter_text = filter_text
  },

  do_filtering() {
    this.events.INVENTORY_REFRESHED.notify(this.get_text_filtered_goods())
  },

  get_text_filtered_goods() {
    if (!this.filter_text) return this.inventory
    let text_filtered_goods = []
    for (let item of this.inventory) {
      if (objUtils.func_is_contains(this.filter_text, item, 'tov_name'))
        text_filtered_goods.push(item)
    }
    return text_filtered_goods
  },

  set_filter_title_ids(balances_filter_id) {
    this.balances_filter_id = balances_filter_id
  },

  refresh_with_filter() {
    this.events.INVENTORY_REFRESHED.notify(this.get_filtered_inventory())
  },

  set_selected_program(selected_program) {
    this.selected_program = selected_program
    this.events.SELECTED_PROGRAM_CHANGED.notify(this.selected_program)
  },

  get_filtered_inventory() {
    if (!this.balances_filter_id) return this.inventory
    let filtered_inventory = []
    for (let good of this.inventory) {
      if (this.balances_filter_id === this.balances_filter_ids.SHORTAGE && good.shortage_sum !== null) {
        filtered_inventory.push(good)
      }
    }
    return filtered_inventory
  }
}