'use strict';

class DataCollection {

    constructor(model) {
        this.model = model;
    }
    get(id) {
        if (id) {
            return this.model.findOne({where:{id:id}});
        } else {
            return this.model.findAll({});
        }
    }

    create(product) {
        return this.model.create(product);
    }

    update(id, data) {
        return this.model.findOne({where: {id:id}})
            .then(product => product.update(data));
    }

    delete(id) {
        return this.model.destroy({where: { id : id  } });
    }
}

module.exports = DataCollection;