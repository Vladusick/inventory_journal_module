import { Model } from '../models/Model'

export const TopToolbar = {

  create() {
    this.models = {
      model: Model.create()
    }
    return this
  },

  render() {
    return {
      id: this.id = objUtils.uid(),
      rows: [
        objUI.toolbar_horizontal([
          objUI.combo_branches({
            localId: 'branches_combo',
            selected_all: true,
            only_one_branch: false
          }),
          objUI.date_range_picker({
            localId: 'date_range_picker',
            label: 'Период',
            value: { start: new Date(), end: new Date() },
            label_autowidth: true,
          }),
          objUI.icon_btn_refresh({ localId: 'refresh_button' }),
          {}
        ])
      ]
    }
  },

  init() {
    objUI.extend_with_local_id_on_destination(this, this.root = $$(this.id))

    this.elements = {
      branches_combo: this.$$('branches_combo'),
      date_range_picker: this.$$('date_range_picker'),
      refresh_button: this.$$('refresh_button')
    }

    this.elements.branches_combo.attachEvent('onChange', (ids) => {
      this.models.model.set_branch_ids(ids)
      this.models.model.load_data().then()
    })

    this.elements.date_range_picker.attachEvent('onChange', () => {
      this.models.model.set_model_date(
        this.elements.date_range_picker.get_date_begin_format(),
        this.elements.date_range_picker.get_date_end_format())
    })

    this.elements.refresh_button.attachEvent('onItemClick', () => {
      this.models.model.load_data().then()
    })
  },
}
