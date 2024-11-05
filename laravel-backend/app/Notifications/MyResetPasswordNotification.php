<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MyResetPasswordNotification extends Notification
{
    use Queueable;
    protected $token;
   
    
    public function __construct($token)
    {
        
        $this->token=$token;
    }

  
    
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

  
    
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('welcom from our website ')
            ->line('this mail is becouse you wanted to reset your password so please click the below button to reset.')
            ->line("It's always important to be cautious with passwords. Make sure to use strong, unique passwords.")

            ->action('Reset Password', env('FRONT_DOMAIN_URL') .'reset'. '?token=' . urlencode($this->token)
                . '&email=' . urlencode($notifiable->email))
            ->line('If you did not request a password reset, no further action is required.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}