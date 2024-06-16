<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyResource\Pages;
use App\Models\Company;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CompanyResource extends Resource
{
    protected static ?string $model = Company::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('email'),
                TextInput::make('full_name'),
                TextInput::make('short_name'),
                Forms\Components\DatePicker::make('email_verified_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y'),
                TextInput::make('contact_phone'),
                TextInput::make('contact_person'),
                TextInput::make('vat_id'),
                TextInput::make('company_number'),
                TextInput::make('registration_house'),
                TextInput::make('street'),
                TextInput::make('city'),
                TextInput::make('zip'),
                TextInput::make('country'),
                Forms\Components\DatePicker::make('created_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y'),
                Forms\Components\DatePicker::make('company_verified_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y')
                    ->minDate(today()),
                Forms\Components\Checkbox::make('is_vat_obligated'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('full_name'),
                Tables\Columns\TextColumn::make('company_verified_at')->date('d.m.Y'),
                Tables\Columns\TextColumn::make('contact_phone'),
                Tables\Columns\TextColumn::make('contact_person'),
                Tables\Columns\TextColumn::make('vat_id'),
                Tables\Columns\TextColumn::make('company_number'),
                Tables\Columns\TextColumn::make('registration_house'),
            ])
            ->filters([
                Tables\Filters\Filter::make('Unverified')->query(fn(Builder $query) => $query->whereNull('company_verified_at'))
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('Ajpes')
                    ->visible(fn($record) => $record->country === 'Slovenia')
                    ->url(fn($record) => 'https://www.ajpes.si/fipo/rezultati.asp?status=1&OsnovnoIskanje='.$record->vat_id, true),
                Tables\Actions\Action::make('Company House')
                    ->visible(fn($record) => $record->country === 'United Kingdom')
                    ->url(fn($record) => 'https://find-and-update.company-information.service.gov.uk/search?q='.$record->company_number, true),
                Tables\Actions\Action::make('Verify')
                    ->visible(fn($record) => $record->company_verified_at === null)
                    ->action(function ($record) {
                    $record->company_verified_at = now();
                    $record->save();
                })
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
            'index' => Pages\ListCompanies::route('/'),
            'create' => Pages\CreateCompany::route('/create'),
        ];
    }
}
