<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyResource\Pages;
use App\Models\Company;
use App\Models\Country;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CompanyResource extends Resource
{
    protected static ?string $model = Company::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    public static function form(Form $form): Form
    {
        $availableCountries = Country::query()
            ->where('id', 203)
            ->get();

        $availableOptions = $availableCountries->map(fn($country) => [
            $country->id => $country->name
        ])->toArray();

        return $form
            ->schema([
                TextInput::make('email'),
                TextInput::make('name'),
                TextInput::make('contact_phone'),
                TextInput::make('contact_person'),
                TextInput::make('vat_id'),
                TextInput::make('company_number'),
                TextInput::make('street'),
                TextInput::make('city'),
                TextInput::make('zip'),
                TextInput::make('country_id'),
                Forms\Components\DatePicker::make('email_verified_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y'),
                Forms\Components\DatePicker::make('created_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y'),
                Forms\Components\DatePicker::make('company_verified_at')
                    ->native(false)
                    ->locale('sl')
                    ->displayFormat('d.m.Y'),
                Forms\Components\Checkbox::make('is_vat_obligated'),
                Select::make('country_id')->options($availableOptions)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('company_verified_at')->date('d.m.Y'),
                Tables\Columns\TextColumn::make('contact_phone'),
                Tables\Columns\TextColumn::make('contact_person'),
                Tables\Columns\TextColumn::make('vat_id')->searchable(),
                Tables\Columns\TextColumn::make('company_number'),
            ])
            ->filters([
                Tables\Filters\Filter::make('Unverified')->query(fn(Builder $query) => $query->whereNull('company_verified_at'))
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('Ajpes')
                    ->visible(fn(/** @var Company $record */$record) => $record->country_id === 203 && $record->company_verified_at === null)
                    ->url(fn($record) => 'https://www.ajpes.si/fipo/rezultati.asp?status=1&OsnovnoIskanje='.$record->vat_id, true),
                Tables\Actions\Action::make('Company House')
                    ->visible(fn(/** @var Company $record */$record) => $record->country_id === 233 && $record->company_verified_at === null)
                    ->url(fn($record) => 'https://find-and-update.company-information.service.gov.uk/search?q='.$record->company_number, true),
                Tables\Actions\Action::make('Verify')
                    ->visible(fn(/** @var Company $record */$record) => $record->company_verified_at === null)
                    ->action(function ($record) {
                    $record->company_verified_at = now();
                    $record->save();
                }),
                Tables\Actions\DeleteAction::make(),

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
