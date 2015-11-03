<?php


class ReportTableSeeder extends Seeder
{
    public function run()
    {
        Report::create(
        array(
                'reportType' => 1,
                'reportName' => 'Fatal Accident between two 4-seaters',
                'reportedBy' => 'John Tan',
                'contactNo'  => 98597484,
                'location'   => 'BUKIT BATOK EAST AVENUE 2',
                'status'     => 1,
                'assignedTo' => 'TP Dept'
            )
        );
        Report::create(
            array(
                'reportType' => 1,
                'reportName' => 'Minor Accident between two 7-seaters',
                'reportedBy' => 'Mary Tan',
                'contactNo'  => 98598984,
                'location'   => 'BOON LAY AVENUE',
                'status'     => 3,
                'assignedTo' => 'TP Dept'
            )
        );
        Report::create(
            array(
                'reportType' => 1,
                'reportName' => 'Fatal Accident between two 4-seaters',
                'reportedBy' => 'John Tan',
                'contactNo'  => 98597484,
                'location'   => 'HILLVIEW AVENUE',
                'status'     => 1,
                'assignedTo' => 'TP Dept'
            )
        );
        Report::create(
            array(
                'reportType' => 1,
                'reportName' => 'Minor Accident between two 4-seaters',
                'reportedBy' => 'Mac Tan',
                'contactNo'  => 98337484,
                'location'   => 'BUKIT BATOK STREET 33',
                'status'     => 1,
                'assignedTo' => 'TP Dept'
            )
        );
        Report::create(
            array(
                'reportType' => 1,
                'reportName' => 'Minor Accident between two buses',
                'reportedBy' => 'Sophia Tan',
                'contactNo'  => 98598114,
                'location'   => 'BOON LAY AVENUE',
                'status'     => 2,
                'assignedTo' => 'TP Dept'
            )
        );
        Report::create(
            array(
                'reportType' => 1,
                'reportName' => 'Fatal Accident between two motocyclist',
                'reportedBy' => 'William Goh',
                'contactNo'  => 98197484,
                'location'   => 'DEPOT ROAD',
                'status'     => 1,
                'assignedTo' => 'TP Dept'
            )
        );
        Report::create(
            array(
                'reportType' => 2,
                'reportName' => 'Multiple dengue outbreaks in the HDB block 706',
                'reportedBy' => 'KK Hospital',
                'contactNo'  => 65668555,
                'location'   => '706 CLEMENTI WEST STREET 2',
                'status'     => 2,
                'assignedTo' => 'Alliance Pest Management Pte Ltd'
            )
        );
        Report::create(
            array(
                'reportType' => 1,
                'reportName' => 'Accident along the road between cyclist and van',
                'reportedBy' => 'Philip Goh',
                'contactNo'  => 81598984,
                'location'   => 'BUKIT BATOK WEST AVENUE 3',
                'status'     => 2,
                'assignedTo' => 'TP Dept'
            )
        );
        Report::create(
            array(
                'reportType' => 2,
                'reportName' => 'Multiple dengue outbreaks in the HDB block 601',
                'reportedBy' => 'KK Hospital',
                'contactNo'  => 65668555,
                'location'   => '601 CLEMENTI WEST STREET 1',
                'status'     => 2,
                'assignedTo' => 'Alliance Pest Management Pte Ltd'
            )
        );
        Report::create(
            array(
                'reportType' => 2,
                'reportName' => 'Multiple dengue outbreaks in the HDB block 221',
                'reportedBy' => 'KK Hospital',
                'contactNo'  => 65668555,
                'location'   => '221 BUKIT BATOK EAST AVENUE 3',
                'status'     => 3,
                'assignedTo' => 'Alliance Pest Management Pte Ltd'
            )
        );
        Report::create(
            array(
                'reportType' => 2,
                'reportName' => 'Multiple dengue outbreaks in the HDB block 506',
                'reportedBy' => 'KK Hospital',
                'contactNo'  => 65668555,
                'location'   => '506 BISHAN STREET 11',
                'status'     => 1,
                'assignedTo' => 'Alliance Pest Management Pte Ltd'
            )
        );
        Report::create(
            array(
                'reportType' => 2,
                'reportName' => 'Multiple dengue outbreaks in the HDB block 510',
                'reportedBy' => 'KK Hospital',
                'contactNo'  => 65668555,
                'location'   => '510 BISHAN STREET 13',
                'status'     => 3,
                'assignedTo' => 'Alliance Pest Management Pte Ltd'
            )
        );

    }
}
