# AppHero

This project was generated with [Angular CLI] version 14.1.3.
Node version 16.15.1
Angular Material version 14.2.3


COMPONENTS

AppComponent: This component renders the application title and the <router-outlet>.
DashboardComponent: Main component that allows to render the component 'HeroesListComponent' and handles the events of editing, adding or removing heroes.
HeroesListComponent: Render the list of heroes and dispatch the events of adding, editing, or removing heroes. It also allows you to filter heroes and paginate them.
HeroFormComponent: Form that is displayed if the user wants to edit or add a hero.
LoadingSpinnerComponent: Render a load spinner.
MessageDialogComponent: Shared modal template.

SERVICES

HeroService: Service that executes the following requests to the server:
  1. getHeroes : get all heroes
  2. getHeroById: get a hero from the ID
  3. searchHeroesByName: obtains an array of heroes from a string
  4. addHero. add a new hero
  5. deleteHero: delete a hero
  6. updateHero: update a hero
  
InMemoryDataService: Allows you to simulate a server

MessageDialogService: Service created to be able to render the MessageDialogComponent in multiple components.

DIRECTIVE

UpperCaseInputDirective: Allows the user to capitalize the text entered in the input at the same time as entering the value.




