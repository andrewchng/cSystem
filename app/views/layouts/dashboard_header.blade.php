<!-- BEGIN HEADER INNER -->
<div class="page-header-inner">
    <!-- BEGIN LOGO -->
    <div class="page-logo col-md-3">
        <a href="/admin">
            <i class="fa fa-globe fa-lg"></i>
            cSystem
        </a>
        <div class="menu-toggler sidebar-toggler hide">
        </div>
    </div>
    <!-- END LOGO -->
    <!-- BEGIN RESPONSIVE MENU TOGGLER -->
    <div class="menu-toggler responsive-toggler col-md-1" data-toggle="collapse" data-target=".navbar-collapse">
    </div>
    <!-- END RESPONSIVE MENU TOGGLER -->
    <!-- BEGIN TOP NAVIGATION MENU -->
    @unless (Auth::check())
    <div class="top-menu col-md-8">
        <ul id="account-panel" class="nav navbar-nav pull-right" ng-show="auth">
            <!-- BEGIN USER LOGIN DROPDOWN -->
            <li class="dropdown dropdown-user" ng-include="'/assets/partials/tab-user-menu.html'"></li>
            <!-- END USER LOGIN DROPDOWN -->
        </ul>
    </div>
    @endunless
</div>
<!-- END TOP NAVIGATION BAR -->

