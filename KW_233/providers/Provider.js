export const Provider = {

  get_data: (param) => objGlobal.func_post_json({
    procName: '233_1_v1',
    procType: 'ro',
    param
  }).then(result => result[0]),

  get_commission_chairman: (param) => objGlobal.func_post_json({
    procName: '233_2_v1',
    procType: 'ro',
    param
  }).then(result => result[0][0]),

  get_commission_members: (param) => objGlobal.func_post_json({
    procName: '233_3_v1',
    procType: 'ro',
    param
  }).then(result => result[0]),

  get_frp: (param) => objGlobal.func_post_json({
    procName: '233_4_v1',
    procType: 'ro',
    param
  }).then(result => result[0]),
}