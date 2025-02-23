<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;

class NewApplicantNotification extends Notification
{
    use Queueable;
    private string $jobTitle;
    private string|null $coverLetter;
    private string $resumeFilename;
    private string $resumeOriginalName;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $jobTitle, string $resumeFilename, string $resumeOriginalName, string|null $coverLetter)
    {
        $this->jobTitle = $jobTitle;
        $this->coverLetter = $coverLetter;
        $this->resumeFilename = $resumeFilename;
        $this->resumeOriginalName = $resumeOriginalName;
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
        $userResume = File::get(Storage::path('resumes/' . $this->resumeFilename));

        $mailMessage = (new MailMessage)
            ->greeting(__("Hello"))
            ->subject(__("JobHuntr: New applicant for :jobTitle !", ['jobTitle' => $this->jobTitle]))
            ->line(__("A new applicant has applied for your job through our system."))
            ->line(__("The users resume is attached to this email."));

        if ($this->coverLetter !== null) {
            $mailMessage
                ->line(__("Applicant's cover letter:"))
                ->line(new HtmlString(nl2br($this->coverLetter)));
        }

        $mailMessage
            ->action(__("Visit your dashboard"), env('APP_BUSINESS_URL'))
            ->line(__("Thank you for using our application!"))
            ->salutation(__("Best regards, JobHuntr"))
            ->attachData($userResume, $this->resumeOriginalName, [
                'mime' => 'application/pdf',
            ]);


        return $mailMessage;



    }
}
