UserAccounts = new Mongo.Collection('contactusers');
if (Meteor.isClient) {
    error = ''
    out = IMG = editimg = noimg= 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAwADADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDNooq3pNsl7q9pbS/6uWZVb3GeRX18moptnw8YuUlFdS/pXhLVNWhFxGscELfdeYkbh7AAmjVfCWqaTCbiRY54V+88JJ2j3BANeoABQFUAADAA6AUEBgVYAgjBB6EV4X9pVea9lbsfR/2VR5LXd+54rRVvVrZLLV7u2i/1cUzKvsM8Cqle7FqSTR85KLjJxfQKfDK9vPHNE22SNg6n0IORTK6Hw/4RuNXRbm4c29oejY+eT6D09z+tRVqQpxvN6GlGlOrPlprU7DSPFOm6pbqXnjtrjHzxSMF59ieoo1fxTpul27FJ47m4x8kUbBufcjoKdbeFNEtU2iwSU92my5P58flS3PhbRLlNrafHGezRZQj8q+evhue+tvkfUWxXs7ac3zPLppXuJ5JpW3SSMXY+pJyaZXSeIPB0+lRNd2jtcWq8sCPnjHqcdR7j8q5uvoaVSFSN4PQ+XrUqlKfLUWpqeG9KGsazFbSf6lQZJcf3R2/EkD8a9WVVRQqqFVRgADAAryvQNebQZZpEtlnaVQvzNt2gf5/Stv8A4WJP/wBA2L/v6f8ACvNxlCvWqe6tEetgMTh6FP3n7z8md1RXC/8ACxJ/+gbF/wB/T/hR/wALEn/6BsX/AH9P+FcX1DEfy/ijv/tHDfzfgzuiARgjIPY15b4q0ldI1l44lxBMPMiH90HqPwP6YrY/4WJP/wBA2L/v6f8ACsbxB4hfXzbl7VYDBuwVfO7OPb2rsweHr0al5LRnBj8Th69K0XqttGf/2Q==';
    function handleFileSelect(evt) {
     var files = evt.target.files;
    // Loop through the FileList and render image files as thumbnails.
    //console.log(files);
    var f = files[0];

      // Only process image files.
      if (!f.type.match('image.*')) {
        alert( "File "+ f.name +" is not an image." );
        return false;
      }
      

      var reader = new FileReader();
        reader.readAsArrayBuffer(f);

      // Closure to capture the file information.
      reader.onload = function(event){
            var blob = new Blob([event.target.result]); 
            window.URL = window.URL || window.webkitURL;
            var blobURL = window.URL.createObjectURL(blob);
            var image = new Image();
            image.src = blobURL;
            image.onload = function() {
                var resized = resizeMe(image); // send it to canvas
                var newinput = document.createElement("input");
                newinput.type = 'hidden';
                newinput.name = 'images[]';
                newinput.value = resized; // put result from canvas into new hidden input
                out = newinput.value;
                console.log(out);
               
          }
      };
  };

function resizeMe(img) {
    var max_height = 200, max_width = 200;
  
  var canvas = document.createElement('canvas');

  var width = img.width;
  var height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > max_width) {
      //height *= max_width / width;
      height = Math.round(height *= max_width / width);
      width = max_width;
    }
  } else {
    if (height > max_height) {
      //width *= max_height / height;
      width = Math.round(width *= max_height / height);
      height = max_height;
    }
  }
  
  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  
  return canvas.toDataURL("image/jpeg",0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)

}


    trimInput = function(value) {
        return value.replace(/^\s*|\s*$/g, '');
    };

    isNotEmpty = function(value) {
        if (value && value !== ''){
            return true;
        }
        error = 'Please fill in all required fields';
        return false;
    };

    isEmail = function(value) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(value)) {
            return true;
        }
        error = 'Please enter a valid email address.';
        return false;
    };

    isValidPassword = function(password) {
        if (password.length < 6) {
            error = 'Your password should be 6 characters or longer.';
            return false;
        }
        return true;
    };

    areValidPasswords = function(password, confirm) {
        if (!isValidPassword(password)) {
            return false;
        }
        if (password !== confirm) {
            error = 'Your two passwords are not equivalent.';
            return false;
        }
        return true;
    };
        

    Template.SignUp.events({
      'submit #signupform': function(e, t) {
        e.preventDefault();
        error = '';
        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val(),
            fname = signUpForm.find('#signUpFname').val(),
            lname = signUpForm.find('#signUpLname').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

          Accounts.createUser({fname: fname, lname: lname, email: email, password: password}, function(err) {
            if (err) {
                if(error == '')
                    error = err.message;
                $("#signupalert").html(error).css('display', 'block');
              if (err.message === 'Email already exists. [403]') {
                console.log('We are sorry but this email is already used.');
              } else {
                console.log(err);
              }
            } 
            else {
              console.log('Congrats new , you\'re in!');
              Meteor._reload.reload();
            }
          });

        }
        if(error != '')
            $("#signupalert").html(error).css('display', 'block');
        return false;
      },

      'submit #loginform': function(e, t) {
        e.preventDefault();
        error = '';
        var signInForm = $(e.currentTarget),
              email = trimInput(signInForm.find('#signInEmail').val().toLowerCase()),
              password = signInForm.find('#signInPassword').val();
           //   console.log(password);
        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

          Meteor.loginWithPassword(email, password, function(err) {
           // console.log(password);

            if (err) {
                if(error == '')
                    error = err.message;
                $("#login-alert").html(error).css('display', 'block');
              console.log('These credentials are not valid.');

            } else {
              console.log('Welcome back !');
              Meteor._reload.reload();
            }
          });

        }
        if(error != '')
            $("#login-alert").html(error).css('display', 'block');
        return false;
      },

    });

    Template.nav.events({
      'click #signOut': function(e, t) {

        Meteor.logout(function() {
          console.log('Bye ! Come back whenever you want!');
        Meteor._reload.reload();
        });

        return false;
      }
    });

    Template.addContact.events({
        'submit #addcontact': function (e, t) {
         //   e.preventDefault();
            var contactform = $(e.currentTarget),
                name = trimInput(contactform.find('#add-name').val()),
                email = trimInput(contactform.find('#add-email').val().toLowerCase()),
                phone = contactform.find('#add-phone').val(),
                address = contactform.find('#add-address').val();
                IMG = out;
                UserAccounts.insert({"name" : name,
                                "email" : email,
                                "phone": phone,
                                "address": address,
                                "image": IMG,
                                "user": Meteor.userId()
                    });
        //    Meteor._reload.reload();
        },

        'change [type=file]':function(e,t){
            e.preventDefault();
            handleFileSelect(e);
        },

        
    });

    Template.home.helpers({
        'contactName':function(){
           // console.log(UserAccounts.findOne({user: Meteror.userId()}).fetch());
            return UserAccounts.find({user: Meteor.userId()}, {sort: {name : 1}});       
        },
    });

      Template.home.events({
        'click #edit-contact': function (e, t){
            //   e.preventDefault();
               Meteor._reload.reload();
        },
    });
    flag = 0;
    Template.editContact.events({
        'submit': function (e, t) {
           // e.preventDefault();
            var editform = $(e.currentTarget),
                name = trimInput(editform.find('#edit-name').val()),
                email = trimInput(editform.find('#edit-email').val().toLowerCase()),
                phone = editform.find('#edit-phone').val(),
                address = editform.find('#edit-address').val();
                console.log(editform.find('#previmage').val());
                editimg = out;
                if(flag == 0)
                    editimg = editform.find('#previmage').val();
                console.log("My new Image: " + editimg);
                UserAccounts.update({_id: id}, {
                                "name" : name,
                                "email" : email,
                                "phone": phone,
                                "address": address,
                                "image": editimg,
                                "user": Meteor.userId()
                });
                flag = 0;
            //    Meteor._reload.reload();
        },

        'change [type=file]':function(e,t){
            e.preventDefault();
            handleFileSelect(e);
            flag = 1;
        },
    });

    Accounts.config({
        forbidClientAccountCreation : false
    });
    if(Meteor.userId()){
       Router.map(function () {
           this.route('addContact', {
                path: '/addcontact'
            }); 

            this.route('home', {
                path: '/'
            }); 

           this.route('editContact', {
                path: '/addcontact/edit/:id',
                data: function(){
                    id = this.params.id;
                    return UserAccounts.findOne({_id: this.params.id});
                }
            });

           this.route('deleteContact', {
                path: '/addcontact/delete/:id',
                data: function(){
                    id = this.params.id;
                     var confirmDelete = window.confirm('Do you want to delete the contact ?');
                    Router.go('home');
                    if(confirmDelete)
                    return UserAccounts.remove({_id: this.params.id});
                }
                
            });

         });

    }
    else{
        Router.route('/', function () {
            this.render(Template.SignUp);
        });   
          Router.route('/addcontact', function () {
                this.render(Template.SignUp);
        });
          Router.route('/addcontact/edit/:id', function () {
                this.render(Template.SignUp);
        });
            Router.route('/addcontact/delete/:id', function () {
                this.render(Template.SignUp);
        });
    }

}

if (Meteor.isServer) {
     Accounts.config({
        forbidClientAccountCreation : false
    });
  Meteor.startup(function () {
    // code to run on server at startup
  //UserAccounts.remove({});
    
  });
}


