require('./src/routes')(app, path);

module.exports = {

  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,

  validate: function (parameters, data, fillable, log, cb){

      if (parameters && typeof(parameters) === 'object') {
        /* Check the fillables */
        for(var index in data) {
            if(fillable.indexOf(index) == -1){
                delete data[index];
            }
        }
        for (var par in parameters) {

           module.exports.logger('Checking '+par+' for '+parameters[par], log);
           if(parameters[par]){

             var conditions = parameters[par].split(',');
             for (var index = 0; index < conditions.length; index++) {
               con = conditions[index];

               switch (con) {

                case 'required':
                  if(!data[par]){
                    module.exports.logger(par+' is required!', log);
                    return cb(par+' is required!');
                  }
                  break;

                case 'email':
                  if(data[par]){
                    if(!module.exports.email.test(data[par])){
                      module.exports.logger(par+' must be a valid email!', log);
                      return cb(par+' must be a valid email!');
                    }
                  }
                  break;

               }

             }

           }
        }
        module.exports.logger('Finishing validation', log);
        return cb();
      }else{
        module.exports.logger('Finishing validation', log);
        return cb();
      }
  },

  logger: function (data, log){
    if(log && log==1){
      console.log(data);
    }
    return;
  }

};
