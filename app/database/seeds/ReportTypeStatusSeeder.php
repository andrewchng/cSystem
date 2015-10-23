<?php


class ReportTypeStatusSeeder extends Seeder
{
    public function run()
    {
        DB::table('ReportStatusType')->insert(
            array('reportStatusTypeName' => 'Pending', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('ReportStatusType')->insert(
            array('reportStatusTypeName' => 'Ongoing', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('ReportStatusType')->insert(
            array('reportStatusTypeName' => 'Resolved', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('ReportType')->insert(
            array('reportTypeName' => 'Traffic', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('ReportType')->insert(
            array('reportTypeName' => 'Dengue', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

    }
}
