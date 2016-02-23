export default class HomeRep {
  constructor(myappRegime) {
    var $ctrl = this;

    myappRegime.getCategories().then(function (categories) {
      $ctrl.menu = categories;
    });
  }
}

HomeRep.$inject = ['myappRegime'];
