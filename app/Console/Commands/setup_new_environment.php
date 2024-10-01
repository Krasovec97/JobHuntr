<?php

namespace App\Console\Commands;

use App\Models\CompanyJob;
use App\Models\Sector;
use App\Models\WorkField;
use Illuminate\Console\Command;

class setup_new_environment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:setup_new_environment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup new environment with new data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting setup new environment');
        $input = $this->ask('How many records do you want to create?');
        $sector = $this->confirm('Do you want to create new sectors');
        $workFields = $this->confirm('Do you want to create new Work fields?');

        if ($sector) Sector::factory($input)->create();
        if ($workFields) WorkField::factory($input)->create();

        CompanyJob::factory($input)->create();
    }
}
