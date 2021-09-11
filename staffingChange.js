// CHECK TO MAKE SURE THAT JQUERY LOADED 
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}   
//******************************************
//Outside function to prevent any Conflicts   
//******************************************
(function() {     
    
 //Create objects 
    var empResultJson       = new Object();  
    var myTransferObject    = new Object();
    var empInfoObject       = new Object();
    var objTransferInfo     = new Object();
    var objFlagTrack        = new Object();
    
//*********MAIN FUNCTION DOCUMENT READY**************    
jQuery(document).ready(function () {     
    
    //Initialize Environment variables 
      //This flag is set to true when a user clicks on "change" Assign or Position
      //Once set to true it will not query the sharepoint site again for performance reasons
      objFlagTrack.boolClickedAssignment = false; 
      objFlagTrack.boolClickedPosition   = false; 
    
    //Set up initial View
      startUp();            
//----------------------------------------------------   
//----------------------CLICK EVENTS------------------ 
//----------------------------------------------------   
    //User has picked a location        
     jQuery("#btnQueryEmp").click(popEmpDropDown);  
    
    //User has clicked "Choose Employee" button  
    jQuery("#btnChooseEmp").click(initChooseStaffing);  
        
    //Add Click event listeners to the Check boxes
     jQuery('#ckAssignment').click(function(){
         
         
         if($('#ckAssignment').is(':checked') == true)
             {                 
                /* alert("Assign Check"); */ 
                 $('#selAssignment').removeClass('hidden');                 
                 //Call Function to Populate the Dropdown if it hasn't been called yet 
                 if(objFlagTrack.boolClickedAssignment == false)
                     {
                         popAssignment();
                         objFlagTrack.boolClickedAssignment = true;
                     }          
               
             }
          else
              {                  
                  /*alert("Unchecked Assignment"); */
                  $('#selAssignment').addClass('hidden');
              }          
         
     }); //End of Check box Assignment 
      
     jQuery('#ckPosition').click(function(){
         
         
         if($('#ckPosition').is(':checked') == true)
             {                 
                 /*alert("Positioin Check"); */
                 $('#selPosition').removeClass('hidden'); 
                 
                 //Call Function to Populate the Dropdown if it hasn't been called yet 
                 if(objFlagTrack.boolClickedPosition == false)
                     {
                         popPosition();
                         objFlagTrack.boolClickedPosition = true;
                     }                  
             }
          else
              {                  
                  /*alert("Unchecked Position");*/
                  $('#selPosition').addClass('hidden');                   
              }
                     
     }); //End of Check box Position
    
     jQuery('#ckShift').click(function(){
         
         
         if($('#ckShift').is(':checked') == true)
             {                 
                 /*alert("Shift Check"); */
                  $('#selShift').removeClass('hidden'); 
             }
          else
              {                  
                  /*alert("Unchecked Shift");*/     
                  $('#selShift').addClass('hidden');
              }
                     
     }); //End of Check box Shift
    
    //This checks to see if any of the boxes are checked
     jQuery("input[type='checkbox'].checkChange").change(function(){
         
         
         var a = $("input[type='checkbox'].checkChange");
         
         if(!a.is(':checked')){             
             
                //Hide the New Value Header
                   $('#divNewValue').addClass('hidden');
                //Disable the Submit Button
                   $('#divSubmitBtn').prop('disabled', true);
               
            }
           else{ //At least one is checked
               
                //Enable the Submit Button
                  $('#divSubmitBtn').prop('disabled', false);
               
               //Show the New Header Value
                  $('#divNewValue').removeClass('hidden');              
           }         
         
           }); 
    
    //Button Event Listenser
     jQuery('#divSubmitBtn').click(function(){  
               
          //Hide the panels not in use at start-up   
            $("[rel='js-transferSummary']").toggleClass("hide"); 
            $("[rel='js-staffingChange']").toggleClass("hide");
         
          //Set the heading
               var headTitle ="Staffing Change Summary for: ";
               headTitle += objTransferInfo.Name;
     
               $('#transferTitle').text(headTitle);  
         
       
         //Check to see what has been selected
           //Check for assignment change
           if($('#ckAssignment').is(':checked')){
                   
                 myTransferObject.assignment_change = true; 
               
                $('#dvAssign').removeClass('hidden');
               
                //Get new value 
                new_assignment   = $("#selAssignment option:selected").text();  
               
                //Assign new value                 
                 $('#dvNewAssign').text(new_assignment);        
             }
            //Check for Position Change    
               if($('#ckPosition').is(':checked')){
                   
                 myTransferObject.position_Change = true; 
                   
                //Show Row
                  $('#dvPosition').removeClass('hidden');
                //Get new value 
                new_position   = $("#selPosition option:selected").text();  
               
                //Assign new value                 
                 $('#dvNewPosition').text(new_position);       
             }
            //Check for Shift Change  
               if($('#ckShift').is(':checked')){
                   
                 myTransferObject.shift_Change = true; 
                   
                  //Show Row
                  $('#dvShift').removeClass('hidden');
               
                //Get new value 
                new_shift   = $("#selShift option:selected").text();  
               
                //Assign new value                 
                 $('#dvNewShift').text(new_shift);       
             }
         
            //Display Comments
                var finalComments = $('textarea#comment').val();
         
            //Assign new Comments                 
                 $('#dvComments').text(finalComments);    
         
     }); //End Submit Button 
    
     jQuery('#btnConfirmSubmission').click(function(){
         
         //Show confirmation panel  
            $("[rel='js-subConfirmation']").toggleClass("hide"); 
         //Hide the Staffing Change formula
            $("[rel='js-transferSummary']").toggleClass("hide");  //Hide the 
         
         //Hide the cancel Button Can't cancel now!
           $('#btnCancel').addClass('hidden');        
         
         //Save the Changed values to the object and No Change to the unchanged objects             
         
            
         //Write the new values to an object
             if (myTransferObject.assignment_change == true)
                 {
                     
                  //Get new value 
                  myTransferObject.new_assignment = $("#selAssignment option:selected").text();  
                  myTransferObject.newAssignId    = $("#selAssignment option:selected").val(); 
                 }
              else{  //No change
                  
                  myTransferObject.new_assignment = 'No_Change';
                  
              }
             if (myTransferObject.position_Change == true)
                 { 
                   //Get new value 
                   myTransferObject.new_position     = $("#selPosition option:selected").text();
                   myTransferObject.positionChoiceId = $("#selPosition option:selected").val();                        
                 }
              else{ //No Change
                  
                  myTransferObject.new_position = 'No_Change';
                  
              }
              if (myTransferObject.shift_Change == true)
                 {
                     //Get new value 
                     myTransferObject.new_shift   = $("#selShift option:selected").text();  
                   
                 }
              else{ //No Change
                  
                  myTransferObject.new_shift = 'No_Change';
                  
                 }         
         
                myTransferObject.comments = $('textarea#comment').val();
          
           //Create the new object
                addListItem();
         
         
     }); //End of Confirm Submission 
    
     jQuery('#btnCancel').click(function(){
          
          
          document.location.reload(true); 
          
          
      }); //End of Cancel Button Pressed
    
    
    jQuery('#btnCloseButton').click(function(){
          
          
          document.location.reload(true); 
          
          
      }); //End of Cancel Button Pressed
    
    
});  // ***************End Document Ready Function*********    
    
// *********************************************************    
/*                      Function Declarations             */ 
// *********************************************************     
function startUp(){             
      
      //Hide the panels not in use at start-up   
      $("[rel='js-staffingChange']").toggleClass("hide");     
      $("[rel='js-transferSummary']").toggleClass("hide");     
      $("[rel='js-subConfirmation']").toggleClass("hide");
     
} /***********End of Start UP***********************************/    
function popEmpDropDown() {    
         
        //Call Search
         searchForEmployee();             
          
} //********************************************************************
function createEmpSearchUrl(){    
    
      //Clear the prior value of the search string
       myTransferObject.empSearchString = '';    
       myTransferObject.searchUrl = '';
       myTransferObject.siteChoice = '';
    
      //Assign value from the text box.   
        myTransferObject.siteChoice = $("#sel1").val();     
       
       //Get the value from the Search Entry box
        myTransferObject.empSearchString = $("#searchInput").val(); 
    
     //Add the search string to the URL
         myTransferObject.searchUrl = "/_api/lists/getbyTitle('Employee%20Records')/items?$filter=substringof('";
         myTransferObject.searchUrl += myTransferObject.empSearchString;
         myTransferObject.searchUrl += "',Title) and (Stage eq 'Active') and (Site_x0020_Location eq '";
         myTransferObject.searchUrl += myTransferObject.siteChoice;
         myTransferObject.searchUrl += "')&$Select=Assignment/Title,AssignmentId,Title,Id&$expand=Assignment&$Select=Position_x0020_Description/Title,Position_x0020_DescriptionId,Title&$expand=Position_x0020_Description&$Select=Assigned_x0020_Shift,Id,Position_x0020_Description";   
    
} //*********************************************************************
function getData(){
    
       //Set up URL for the search    
           var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    
            var fullUrl = siteUrl + myTransferObject.searchUrl;        
             $.ajax({
                url: fullUrl,
                type: "GET",
                headers: {
                  "accept": "application/json;odata=verbose",
                  "content-type": "application/json;odata=verbose",
                  },
                  
                  success: onQuerySucceeded,
                  error:   onQueryFailed                
                
                });       
}//************************************************************** 
function onQuerySucceeded(data) {    
    
             var element = '';               
             var optionsValues = '';           
    
    //Check value for the boolean chooseDropDown
             switch(myTransferObject.queryChoice)
                     {  
                     
                 case 1:  //** Select Employee**   
                     
                         //Check to see if at least one result came back
                         if(data.d.results.length>0)                     
                         {
                             enableClearEmpDropDwnEnableBtn();                   

                              $.each(data.d.results, function (key, value) {  

                           optionsValues +='<option value= "' + key + '">' + value.Title + '  :  ' +  value.Assignment.Title + '</option>';        
                           });                          
                         }
                         //No results were returned
                         else{                         

                             //Disable the Choose Employee Button
                                clearEmpDropDwnDisableBtn();

                             optionsValues +='<option value = "1">NO RESULTS! Please Search Again</option>';                          
                         }                  

                          $('#sel2').append(optionsValues); 


                           break;

                    case 2:  // ** Select Assignment ** 
                          
                     
                      $.each(data.d.results, function (key, value) {                                        
                                                        
                      optionsValues +='<option value= "' + value.Id + '">' +  value.Title + '</option>';                               
                       });            
                 
                       $('#selAssignment').append(optionsValues);                  
                
                       break;  
             
                    case 3:  // *** Select Position ** 
                     
                  
                     
                        $.each(data.d.results, function (key, value) {  
                                                        
                      optionsValues +='<option value= "' + value.Id + '">' +  value.Title + '</option>';   
                       });            
                 
                       $('#selPosition').append(optionsValues);             
                    
                     
                     break;                      
                     
                     default:
                     
                         console.log("Error in Switch Statement in Default Section")
                     
             } // ********** End Switch Statement ******************            
    
                 //Result Data
                  empResultJson = data.d.results;   
    
    
}//********************************************************************************    
function onQueryFailed() {       
    
              //Disable the Choose Employee Button
                 clearEmpDropDwnDisableBtn();    

                 alert('The Query Failed Please try again.');
}//********************************************************************************         
function enableClearEmpDropDwnEnableBtn(){    
    
     //Clean out any prior options in the dropdown
            $('#sel2 option').remove();   
    
            $('#btnChooseEmp').prop('disabled', false);      
}//********************************************************************************  
function clearEmpDropDwnDisableBtn(){    
    
    //Clean out any prior options in the dropdown
            $('#sel2 option').remove();    
            $('#btnChooseEmp').prop('disabled', true);        
    
}//********************************************************************************          
function initChooseStaffing(){  
    
       //Hide the Current Panel
         $("[rel='js-employeeSearch']").toggleClass("hide");
     
     
       //Get the index from the select drop down
         indexSelEmployee = $('#sel2  option:selected').val();
     
       //Assign the correct JSON object 
         empInfoObject  = empResultJson[indexSelEmployee];
     
     //Set values in Employee Object
         objTransferInfo.Name         = empInfoObject.Title;
         objTransferInfo.currAssign   = empInfoObject.Assignment.Title;  
         objTransferInfo.currShift    = empInfoObject.Assigned_x0020_Shift;   
         objTransferInfo.Id           = empInfoObject.Id;    
         objTransferInfo.currPosition = empInfoObject.Position_x0020_Description.Title;       
     
//Set the heading
       var heading ="Choose Staffing Changes for:";
           heading += objTransferInfo.Name;
     
     $('#chooseChangesTitle').text(heading);  
     
     //Populate the table  
     $('.clCurAssignment').text(objTransferInfo.currAssign);  
          
     $('.clCurrPos').text(empInfoObject.Position_x0020_Description.Title); 
     /*$('#dvCurrentPosition').text(empInfoObject.Position_x0020_Description.Title);*/   
     
     $('.clCurShift').text(objTransferInfo.currShift);      
     
     //Show the next Panel
       $("[rel='js-staffingChange']").toggleClass("hide");       
     
}//*******************************************************************************    
function popAssignment() {
    
      //Clean out any prior options in the dropdown
        $('#selAssignment option').remove();  
    
      
     //Build URL query from the Assignment list
       myTransferObject.searchUrl = '';        
       myTransferObject.searchUrl ="/_api/lists/getbyTitle('Client%20Account')/items?$Select=ID,Title";  
    
     //Set Value in queryChoice
       myTransferObject.queryChoice = 2;
     
    //Submit the Query
      getData();  
}//******************************************************************************** 
function popPosition() {
    
        //Clean out any prior options in the dropdown
          $('#selPosition option').remove();     
        
       //Build URL query from the Assignment list
       myTransferObject.searchUrl = '';        
       myTransferObject.searchUrl ="/_api/lists/getbyTitle('Position')/items?$Select=ID,Title";
      
       //Set Value in queryChoice
       myTransferObject.queryChoice = 3;
     
      //Submit the Query
        getData();  
      
}//*******************************************************************************   
function searchForEmployee(){
    
    //Create the Search URL
      createEmpSearchUrl();
    
    //Set Value in queryChoice
       myTransferObject.queryChoice = 1;    
    
    //Submit the Query
      getData();        
}//*********************************************************************************       
function addListItem()  {          
                      
            var clientContext = new SP.ClientContext();
            var oList = clientContext.get_web().get_lists().getByTitle('StaffingChanges');
           
            var itemCreateInfo = new SP.ListItemCreationInformation();
            this.oListItem = oList.addItem(itemCreateInfo);        
          
             oListItem.set_item('Title',                 objTransferInfo.Name);
             oListItem.set_item('Site',                  myTransferObject.siteChoice);
             oListItem.set_item('EmployeeRecordId',      objTransferInfo.Id); 
      
          
    
           //Assignment Values
             oListItem.set_item('OldAssignment',         objTransferInfo.currAssign);
             oListItem.set_item('NewAssignment',         myTransferObject.new_assignment); 
             oListItem.set_item('newAssignChoiceId',     myTransferObject.newAssignId); 
     
           //Position Values
             oListItem.set_item('oldPosition',              objTransferInfo.currPosition);
             oListItem.set_item('newPositionChoice',        myTransferObject.new_position);
             oListItem.set_item('newPositionChoiceId',      myTransferObject.positionChoiceId);
    
           //Shift Values
             oListItem.set_item('NewShift',              myTransferObject.new_shift);
             oListItem.set_item('OldShift',              objTransferInfo.currShift);
    
             oListItem.set_item('AdditionalComments',    myTransferObject.comments);  
                  
             oListItem.update();           
           
             clientContext.load(oListItem);           
           
             clientContext.executeQueryAsync(           
           
             Function.createDelegate(this, onAddSucceeded),
             Function.createDelegate(this, onAddFailed)
               
               );               
} //********************************************************************************* 
function onAddSucceeded(sender, args) {
              
                 console.log('In Succeeded Block'); 
                     
             
} //*********************************************************************************
function onAddFailed(sender, args) {           

                 console.log('In Failed Block'); 
} //*********************************************************************************         
    
  
    
    
    
    
    
}());  //############### END OF OUTSIDE FUNCTION ###############     


/*</script>*/

