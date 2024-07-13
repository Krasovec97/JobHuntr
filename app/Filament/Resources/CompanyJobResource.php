<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyJobResource\Pages;
use App\Models\CompanyJob;
use Filament\Facades\Filament;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use MatanYadaev\EloquentSpatial\Objects\Point;

class CompanyJobResource extends Resource
{
    protected static ?string $model = CompanyJob::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')->columnSpanFull()->required(),
                RichEditor::make('description')->columnSpanFull()->required(),
                Select::make('employment_type')->options([
                    'full_time' => __("Full-Time"),
                    'part_time' => __("Part-Time")
                ])->required(),
                TextInput::make('salary')->required(),
                Select::make('salary_currency')->options([
                    'eur' => "EUR",
                    'gbp' => "USD",
                    'usd' => "GBP"
                ])->required(),
                Select::make('work_area_id')->relationship('workArea', 'name')->required(),
                Select::make('work_field_id')->relationship('workField', 'name')->required(),
                Select::make('work_location')->options([
                    'remote' => __("Completely online / Remote"),
                    'hybrid' => __("Partially online"),
                    'on_location' => __("On location")
                ])->required(),
                Select::make('preferred_education')->options([
                    'none' => __("None"),
                    'primary' => __("Primary school or equivalent"),
                    'high_school' => __("High school or equivalent"),
                    'bachelor' => __("Bachelor's degree or equivalent"),
                    'master' => __("Master's degree or equivalent"),
                    'doctorate' => __("Doctorate"),
                ])->required(),
                TextInput::make('open_positions_count')->columnSpanFull()->required(),
                TextInput::make('street'),
                TextInput::make('zip'),
                TextInput::make('city'),
                TextInput::make('country'),
                Select::make('status')->options([
                    'draft' => __('Draft'),
                    'active' => __('Active')
                ])->required()->columnSpanFull(),
                DatePicker::make('posted_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y')
                    ->minDate(today())
                    ->default(today()),
                DatePicker::make('expires_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y')
                    ->minDate(today()->addMonth()),
                TextInput::make('application_mail')->required(),
                Select::make('company_id')->relationship('company', 'full_name')->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('company.full_name'),
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('employment_type'),
                Tables\Columns\TextColumn::make('salary'),
                Tables\Columns\TextColumn::make('workArea.name'),
                Tables\Columns\TextColumn::make('workField.name'),
                Tables\Columns\TextColumn::make('work_location'),
                Tables\Columns\TextColumn::make('status'),
                Tables\Columns\TextColumn::make('expires_at')->date('d.m.Y'),
                Tables\Columns\TextColumn::make('posted_at')->date('d.m.Y'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCompanyJobs::route('/'),
            'create' => Pages\CreateCompanyJob::route('/create'),
//            'edit' => Pages\EditCompanyJob::route('/{record}/edit'),
        ];
    }
}
