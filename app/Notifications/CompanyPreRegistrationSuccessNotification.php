<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CompanyPreRegistrationSuccessNotification extends Notification
{
    use Queueable;
    private string $vatId;
    /**
     * Create a new notification instance.
     */
    public function __construct(string $vatId)
    {
        $this->vatId = $vatId;
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
            ->line(__("Welcome aboard. Your account has been partially created. Please finish your registration by clicking the button below."))
            ->action(__("Complete registration"), url('/preregister/'.$this->vatId))
            ->line(__("If this was not you, please contact us, to delete your account."))
            ->line(__("We are thrilled to have you on board and we can't wait to help you reach more people!"))
            ->salutation(__("Best regards, JobHuntr"));
    }
}
