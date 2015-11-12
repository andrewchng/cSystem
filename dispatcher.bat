@echo off

set /p frequency="Enter frequency (in seconds): "
:loop
echo.
php.exe "dispatcher.php" %frequency%
timeout /t %frequency%
goto loop