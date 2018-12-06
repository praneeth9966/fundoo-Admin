import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { bindCallback } from 'rxjs';
@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.css']
})
export class QuestionanswerComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    /**calling jQuery's $ function, passing to it the document object */
    /** ready event occurs when the DOM loaded */
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var questionArray = [];

      /**AJAX is a technique for accessing web servers from a web page. */
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: {
          'Authorization': token,
        },

        /**success is callback of $.ajax */

        success: function (response) {
          $("#hide").hide();
          var questionId = [];
          console.log("successfull");
          console.log(response.data);

          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i+1, response.data[i].message])
            questionId.push(response.data[i])
          }

          var questionTable = $('#questions_data').DataTable({
            data: questionArray,
            scroller: true,
            scrollY: 300,
            scrollX: false,

            "columnDefs": [ {
              "targets": -1,
              "defaultContent": 
              '<div class="btn-toolbar ">'+
              '<button style="border-color:black;background-image: linear-gradient(skyblue, white);color:black" class="newBtn btn btn btn-info type="button">Approve</button>'+'<div>'+'</div>'
              + '<button style="border-color:black;background-image: linear-gradient(skyblue, white);color:black;margin-left:10px" class="Mybtn btn btn btn-info"  type="button">Reject</button>'
              +'</div>'
         } ]
          });

          parent;
          $('#questions_data').on('click', '.newBtn', function () {
            var RowIndex = $(this).closest('tr');
            var data = questionTable.row(RowIndex).data();

            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                this.parent = questionId[i].id;
                // this.questionTable.splice(i, 1)
              }

            }

            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/' + this.parent,
              dataType: "json",
              isApproved: true,
              headers: {
                'Authorization': token,
              },

              /**success is callback of $.ajax */
              success: function (response) {
                console.log('success', response);

                console.log(response.data);
                $(this).addClass('row_selected');
                alert('approved');
                location.reload(true); 

              },

              /**error callback of $.ajax if error occcurs */
              error: function (response) {
                console.log('error');
                return false;
              },

            });

          });

          var parentNew;
          $('#questions_data').on('click', '.Mybtn', function (e) {
            var RowIndex = $(this).closest('tr');
            var data = questionTable.row(RowIndex).data();
            console.log('questionid', data);
            console.log('questionid', questionId[0].parentId);

            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                this.parentNew = questionId[i].id;
              }
            }
            console.log('questionid...', this.parentNew);

            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/' + this.parentNew,
              dataType: "json",
              headers: {
                'Authorization': token,
              },

              /**success is callback of $.ajax */
              success: function (response) {
                console.log('success', response);
                console.log(response.data);
                // $(this).find(".complete-tick").css('display','block');
                // e.preventDefault();
                alert('UnApproved')
                // location.reload(true); 
              },

              /**error callback of $.ajax if error occcurs */
              error: function (response) {
                console.log('error');
                return false;
              },

            });

          });

          return false;
        },

        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },

      });

      $('#backbutton').on('click', function () {
        $(location).attr('href','/admin-dashboard')
      });

    });
  }

}
