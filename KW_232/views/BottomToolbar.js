import { Model } from "../models/Model"

export const BottomToolbar = {

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
          objUI.icon_btn_add({
            localId: 'btn_add_inventory'
          }),
          {}
        ])
      ]
    }
  },

  init() {
    objUI.extend_with_local_id_on_destination(this, this.root = $$(this.id))

    this.elements = {
      btn_add_inventory: this.$$('btn_add_inventory'),
    }

    // Открыте модуля Инвентаризации
    this.elements.btn_add_inventory.attachEvent('onItemClick', () => {
      ModuleManager.show_module({ name: 'KW_233' })
    })
  },
}