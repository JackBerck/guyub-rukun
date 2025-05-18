<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AffairResource\Pages;
use App\Filament\Resources\AffairResource\RelationManagers;
use App\Models\Affair;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AffairResource extends Resource
{
    protected static ?string $model = Affair::class;
    protected static ?string $navigationGroup = 'Affairs Management';
    protected static ?string $navigationIcon = 'heroicon-s-calendar-days';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('thumbnail')
                    ->image()
                    ->imageEditor()
                    ->columnSpanFull()
                    ->directory("affair-thumbnails")
                    ->required(),

                Forms\Components\Select::make('user_id')
                    ->label('User Email')
                    ->preload()
                    ->searchable()
                    ->relationship('user', 'email')
                    ->required(),

                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),

                Forms\Components\DatePicker::make('date'),
                Forms\Components\TimePicker::make('time'),
                Forms\Components\Select::make('affair_category_id')
                    ->label('Affair Category')
                    ->createOptionForm([
                        Forms\Components\TextInput::make('name')
                            ->label('Category Name')
                            ->required()
                            ->placeholder('Enter category name')
                            ->maxLength(255),
                    ])
                    ->preload()
                    ->searchable()
                    ->relationship('affairCategory', 'name')
                    ->required(),
                Forms\Components\TextInput::make('location')
                    ->maxLength(255),
                Forms\Components\RichEditor::make('description')
                    ->fileAttachmentsDirectory("affair-descriptions")
                    ->disableToolbarButtons([
                        "codeBlock",
                        "attachFiles",
                    ])
                    ->columnSpanFull(),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.email'),
                Tables\Columns\TextColumn::make('user.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('time')
                    ->time(),
                Tables\Columns\TextColumn::make('location')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('affairCategory.name')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
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
            'index' => Pages\ListAffairs::route('/'),
            'create' => Pages\CreateAffair::route('/create'),
            'edit' => Pages\EditAffair::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
