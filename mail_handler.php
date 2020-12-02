<?php 
    if(isset($_POST['submit'])){
        $to = "hannah.williams44.1997@gmail.com"; // this is your Email address
        $from = $_POST['email']; // this is the sender's Email address
        $name = $_POST['name'];
        $subject = "Form submission";
        $message = $first_name . " from " . $_POST['email'] . " wrote the following:" . "\n\n" . $_POST['message'] ;

        $headers = "From:" . $from;
        $headers2 = "From:" . $to;
        mail($to,$subject,$message,$headers);
        header( "refresh:5;url=contact.html" );
    }
?>
