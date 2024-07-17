<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetNotification extends Notification
{
    use Queueable;
    private string $token;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->greeting(__("Hello"))
                    ->line(__("It seems that you have requested to change your password."))
                    ->line(__("If that is not the case, please just ignore this email."))
                    ->action(__("Reset password!"), url('/password/reset/' . $this->token))
                    ->line(__("Thank you for using JobHuntr!"))
                    ->salutation(__("Best regards, JobHuntr"));

    }


}
