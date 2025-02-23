<?php

namespace App\Console\Commands;

use App\Models\CompanyJob;
use Carbon\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapGenerator;
use Illuminate\Console\Command;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the sitemap for JobHuntr';

    public function handle()
    {
        $sitemap = Sitemap::create();

        $sitemap
            ->add(Url::create('/'))
            ->add(Url::create('/jobs'))
            ->add(Url::create('/companies'))
            ->add(Url::create('/remote'));

        $jobs = CompanyJob::query()
            ->whereNotNull('posted_at')
            ->where('expires_at', '>', Carbon::now())
            ->whereNot('status', 'draft')
            ->get();

        foreach ($jobs as $job) {
            $sitemap->add(Url::create('/jobs/' . $job->id));
        }


        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully!');
    }
}
