import { Model } from "../models/Model"

export const ContextMenu = {

  create() {
    this.models = {
      model: Model.create(),
    }
    return this
  },

  render() {
    objUI.contextmenu(KW_233, {
      id: this.id = objUtils.uid(),
      data: [
        { id: '1', value: 'Редактировать (только в определенных случаях)' },
        { id: '2', value: 'Удалить' },
        { id: '3', value: 'Сбросить' },
      ]
    })
  },

  init() {
    objUI.extend_with_local_id_out_of_module(KW_233, this, this.root = $$(this.id))

    this.elements = {
      context_menu: this.root
    }

    this.elements.context_menu.attachTo(KW_233.views.inventory_table.elements.table)

    this.elements.context_menu.attachEvent('onItemClick', (id) => {
      const selected_item = KW_233.views.inventory_table.elements.table.getSelectedItem()
      console.log(selected_item)
      if (selected_item) {
        switch (id) {
          case '1':
            console.log('Редактировать (только в определенных случаях)')
            break
          case '2':
            objDesktop.func_script_load('KW_233', selected_item)
            objUI.modalbox({
              title: 'Удаление товара',
              text: `Вы уверены, что хотите удалить товар ${selected_item.tov_name} из инвентаризации?`,
              width: 300,
              buttons: ['ok', 'cancel'],
              callback: (value) => {
                if (value === 'ok') {
                  console.log('formok')
                }
              }
            })
            break
          case '3':
            console.log('Сбросить')
            objUI.modalbox({
              title: 'Сброс прогресса инвентаризации',
              text: 'Сбросить прогресс инвентаризации выбранного товара?',
              width: 300,
              buttons: ['ok', 'cancel'],
              callback: (value) => {
                if (value === 'ok') {
                  console.log('formok')
                }
              }
            })
            break
        }
      }
    })
  }
}