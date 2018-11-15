import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.btn').click(function () {




        var em = $("#email").val()
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(em)) {
          $('#email').val('');
          $("h6").text("Invalid Email Format").show().fadeOut(5000);;
          
        }

        else if (($("#email").val() == '') && $("#password").val() == '') {

          $("h6").text("email and password are required").show().fadeOut(5000);
        }
        else if ($("#email").val() == '') {
          $('#email').val('');
          $('#password').val('');
          $("h6").text("Enter email").show().fadeOut(5000);
        }
        else if ($("#password").val() == '') {
          $('#password').val('');
          $('#email').val('');
          $("h6").text("Enter password").show().fadeOut(5000);
        }


        else {


          const user = {
            email: $("#email").val(),
            password: $("#password").val()
          }
          const Url = 'http://34.213.106.173/api/user/adminLogin';
          console.log(user);


          $.ajax({
            url: Url,
            type: "POST",
            data: user,
            success: function (res) {
              console.log(res);
              
              $(location).attr('href','/admin-dashboard')
              localStorage.setItem('token', res.id);

            },
            error: function (error) {
              console.log(error);
              $("h6").text("Invalid credentials").show().fadeOut(5000);
              $('#email').val('');
              $('#password').val('');
            }


          })


          return false;





        }

      })
    })
  }

}
