/**
 * @method 动态添加抽屉组件，点击保存回调方法
 * @param param 请求地址
 * @author phuhoang
 */

export function DrawerRefSave(param) {
  return function (target, propertyKey) {
    target[propertyKey] = function () {
        if (this.formGroup.invalid) {
          for (let i in this.formGroup.controls) {
            this.formGroup.controls[i].markAsDirty();
            this.formGroup.controls[i].updateValueAndValidity();
          }
        } else {
          let params = this.formGroup.value;
          Object.keys(params).map(res => {
            if (params[res] instanceof Date) {
              params[res] = formatTime(params[res]);
            }
          });
          this.http.post(param, {
            paramJson: JSON.stringify(this.formGroup.value)
          }).then(res => {
            this.saveLoading = false;
            this.drawerRef.close(true);
          }).catch(err => this.saveLoading = false);
        }
    }
  }
}

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
