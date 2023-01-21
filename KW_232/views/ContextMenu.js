import { Model } from "../models/Model"

export const ContextMenu = {

  create() {
    this.models = {
      model: Model.create(),
    }
    return this
  },

  render() {
    objUI.contextmenu(KW_232, {
      id: this.id = objUtils.uid(),
      data: [
        { id: '1', value: 'Удалить' },
        { id: '2', value: 'Редактировать / Просмотр' },
      ]
    })
  },

  init() {
    objUI.extend_with_local_id_out_of_module(KW_232, this, this.root = $$(this.id))

    this.elements = {
      context_menu: this.root
    }

    this.elements.context_menu.attachTo(KW_232.views.inventory_table.elements.table)

    this.elements.context_menu.attachEvent('onItemClick', (id) => {
      const selected_item = KW_232.views.inventory_table.elements.table.getSelectedItem()
      console.log(selected_item)
      if (selected_item) {
        switch (id) {
          case '1':
            // Если инвентаризация закончена, ее нальзя удалять
            if (selected_item.status === '1') {
              webix.message({ text: KW_232.lcl.finished_warn, type: 'error', expire: 3000 })
              break
            }
            this.models.model.delete_inventory(selected_item)
            break

          case '2': // Добавить функционал с открытием модуля которого еще нет
             objDesktop.func_script_load('KW_233', selected_item)
            break
        }
      }
    })
  }
}