## Pandaxx Crisis Management System

###Centralized Crisis Management System

Includes:
* REST API Interface implemented with Laravel and few libraries
* Frontend implemented with Angular.js
* Social Media Integration
* Scheduled Report Update Email

Setup:
* Download the entire package
* Download [Composer](https://getcomposer.org/)
* Update your local hosts file with following lines
  * For windows: C:\Windows\System32\drivers\etc\hosts
  ```
  127.0.0.1       ssad.localhost
  127.0.0.1       api.ssad.localhost
  ```
* Setup PHP mail driver
  * in php\php.ini | update following lines
  ```
    ; uncomment the line below by removing semi-colon
    sendmail_path = "\"C:\xampp\sendmail\sendmail.exe\" -t"
    ; comment the line below with semi-colon
    ;sendmail_path="C:\xampp\mailtodisk\mailtodisk.exe"
  ```
  * in sendmail\sendmail.ini | update following lines
  ```
    smtp_server=smtp.gmail.com
    smtp_port=587
    auth_username='your_email'
    auth_password='your_password'
  ```

## Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/downloads.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as authentication, routing, sessions, and caching.

Laravel aims to make the development process a pleasing one for the developer without sacrificing application functionality. Happy developers make the best code. To this end, we've attempted to combine the very best of what we have seen in other web frameworks, including frameworks implemented in other languages, such as Ruby on Rails, ASP.NET MVC, and Sinatra.

Laravel is accessible, yet powerful, providing powerful tools needed for large, robust applications. A superb inversion of control container, expressive migration system, and tightly integrated unit testing support give you the tools you need to build any application with which you are tasked.

## Official Documentation

Documentation for the entire framework can be found on the [Laravel website](http://laravel.com/docs).

### Contributing To Laravel

**All issues and pull requests should be filed on the [laravel/framework](http://github.com/laravel/framework) repository.**

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
