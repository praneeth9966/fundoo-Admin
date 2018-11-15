import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net'
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var token = localStorage.getItem('token')
    $(document).ready(function () {

      $.ajax({
        url: 'http://34.213.106.173/api/user/getAdminUserList',
        type: "GET",

        success: function (res) {
          console.log(res);
          var usersArray = [];
          for (var i = 0; i < res.data.data.length; i++) {
            usersArray.push([i + 1, res.data.data[i].firstName, res.data.data[i].lastName, res.data.data[i].email, res.data.data[i].service])
          }
          console.log(usersArray);

          var table = $('#users_data').DataTable({
            data: usersArray,
            deferRender: true,
            scrollY: 200,
            scrollCollapse: true,
            scroller: true,

          });
          $('#users_data tbody').on('click', 'tr', function () {

            var myindex = table.row(this).index();


            $("#firstName").text(res.data.data[myindex].firstName);
            $("#lastName").text(res.data.data[myindex].lastName);
            $("#email").text(res.data.data[myindex].email);
            $("#phoneNumber").text(res.data.data[myindex].phoneNumber);
            $("#role").text(res.data.data[myindex].role);
            $("#service").text(res.data.data[myindex].service);
            $("#createdDate").text(res.data.data[myindex].createdDate);
            
            

            $("#dataPopup").click();
          });




        },
        error: function (error) {
          console.log(error);
        }
      })

      $.ajax({
        type: "GET",/**posting the data */
        url: 'http://34.213.106.173/api/user/UserStatics',
        headers: {
          'Authorization': token,


        },
        success: function (response) {
          console.log("successfull");
          console.log(response);
          var arr = response.data.details;

          var html = "";
          for (var i = 0; i < arr.length; i++) {
            html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card' style='margin-top:10%; border-color:black; background-image: linear-gradient(skyblue, white);'>";
            html += "<div class='card-title' style='padding-top:10%'><h4><u>" + arr[i].service + "</u></h4></div>";
            html += "<div class='card-body' style='padding-bottom:10%'>number of users: " + arr[i].count + "</div>";
            html += "</div></div>";
          }
          $("#services").html(html);

        },
        error: function (error) {/**if error exists then print the alert */
          console.log(error);
        }

      })

      $('#button').on('click', function () {
        $.ajax({
          url: 'http://34.213.106.173/api/user/logout',
          headers: {
            'Authorization': token
          },
          type: "POST",
          success: function () {
            console.log("successful");

           
            $(location).attr('href','/admin-login')
            localStorage.removeItem('token');
          },
          error: function (error) {
            console.log(error);

          }
        })
      });
    })
  }

}
