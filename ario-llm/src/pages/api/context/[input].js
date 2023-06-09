export default function handler(req, res) {
    res.status(200).json([
        {
            "page_content": "EEG waveforms Monitor Weight: 3.5 lbs (1.6 kg) Monitor Dimensions: 7.5 in wide x 8 in high x 5 in deep (19 cm x 20.3 cm x 12.7 cm) Display Size: 4 in high x 5.25 in wide (10 cm x 13 cm) Digital Output: USB ports A, B, RS232 serial port Power Requirements: 100–240 VAC, 50–60 Hz, 0.7 ampere max. Electrical Safety: Conforms to: UL 60601-1, IEC 60601-2-26, CAN/CSA-C22.2#601.1 Battery Backup: 45 minutes at full operation Recharge Time: 6 hours Software Updates: User-via USB port (Type A) Operator Position: 3.3 ft (1 meter) in front of unit with display at eye levelSound PressureReadings (Typical):Reminder Tone:Low Priority:High Priority:42 - 54.5 dBA51 - 62.2 dBA56 - 67.5 dBASpecifications, Warranty and Software License AgreementB-2  Operator’s ManualEEG SpecificationsBISX™ SpecificationsEpoch Duration: 2 seconds Artifact Rejection: Automatic Input Amplifier Range: ± 1 mV EEG Scales: One channel display: 25 μV/div (± 50 μV full scale) Two channel display: 50 μV/div (± 50 μV per waveform)",
            "metadata": {
                "document": "BIS Complete Monitoring System"
            }
        },
        {
            "page_content": "Duration: 2 seconds Artifact Rejection: Automatic Input Amplifier Range: ± 1 mV EEG Scales: One channel display: 25 μV/div (± 50 μV full scale) Two channel display: 50 μV/div (± 50 μV per waveform) EEG Sweep Speed: 25 mm/sec Computed Parameters: Bispectral Index, Suppression Ratio, EMG, Signal Quality Indicator, and Burst Count User-defined Displays: Trend and real-time EEG waveforms Update Rate: 1 second for BIS™ number, 10 seconds for Trend Alarms: Auditory and visual, user adjustable limits Filters: ON (2–70 Hz with notch) or OFF (0.25–100 Hz) Mode: Sensor automatically selects mode BISX:Weight:Dimensions:Cable Length:10.0 oz (0.284 kg) including integral cable3.75 in diameter x 2.5 in thick (9.5 cm x 6.3 cm)9 ft (2.7 m) Integral BISX Cable 4 ½ ft (1.4 m) from BISX to sensor connectorAnalog to Digital Converter: Noise-shaped sigma-delta Sampling Rate: 16,384 samples/second Resolution: 16 Bits at 256 samples/second Input Impedance: 50 M ohms typical (DC)5 M ohms typical (at 10",
            "metadata": {
                "document": "BIS Complete Monitoring System"
            }
        },
        {
            "page_content": "the BIS Complete system in a flammable atmosphere or where concentrations of flammable anesthetics may occur. WARNING:Monitor is not designed for use in MRI environment. Temperature -10°C to +60°C (14°F to 140°F)Humidity 15% to 95% (non-condensing) Pressure 800 mm Hg (1500 feet below sea level) to 360mm Hg (20,000 feet above sea level) Installation and Preparation for Use3-4  Operator’s ManualThe BIS Complete monitor is designed to operate safely under the following conditions. Conditions outside these ranges could affect reliability.3.3.3 Power Requirements and System GroundingThe BIS Complete Monitoring System requires a power source of 100–240 VAC, 50–60Hz. Current consumption is 0.7 ampere maximum.To protect operating personnel and patients, the monitor must be properly grounded. Accordingly, the monitor is equipped with a hospital grade line cord. The power cord grounds the system to the power line ground when plugged into an appropriate three-wire receptacle. WARNING:Use only",
            "metadata": {
                "document": "BIS Complete Monitoring System"
            }
        },
        {
            "page_content": "based on impedance data, artifact, and other variables. Smoothing Rate — The rate over which the BIS value is averaged. Suppression Ratio — A calculated parameter that indicates when an isoelectric (flatline) condition may exist. Suppression ratio is the percentage of time over the last 63-second period that the signal is considered to be in the suppressed state (isoelectric). When SR equals 100, it means that during 100% of the last 63 second time period, no significant amount of electrical activity was detected.  B-1B Specifications, Warranty and Software License AgreementB.1 SpecificationsThis appendix lists specifications for the BIS™ Complete Monitoring System.General SpecificationsProduct Description: BIS (Bispectral Index) monitoring system for display of processed data and real-time EEG waveforms Monitor Weight: 3.5 lbs (1.6 kg) Monitor Dimensions: 7.5 in wide x 8 in high x 5 in deep (19 cm x 20.3 cm x 12.7 cm) Display Size: 4 in high x 5.25 in wide (10 cm x 13 cm) Digital",
            "metadata": {
                "document": "BIS Complete Monitoring System"
            }
        },
        {
            "page_content": "Electrostatic dis-charge (ESD) IEC 61000-4-2 ± 6 kV contact ± 8 kV air ± 6 kV contact ± 8 kV air Floors should be wood, concrete or ceramic tile. If floors are covered with synthetic material, the relative humidi-ty should be at least 30%. Electrical fast transient/burst IEC 61000-4-4 ± 2 kV for power supply lines. ± 1 kV for input/output lines. ± 2 kV for power supply lines. ±1 kV for input/output lines. Mains power quality should be that of a typical commercial or hospital envi-ronment. Surge IEC 61000-4-5 ±1 kV differential mode ±2 kV common mode ±1 kV differential mode ±2 kV common mode Mains power quality should be that of a typical hospital environment. Voltage dips, short interrup-tions and voltage variations on power supply input lines. IEC 61000-4-11 < 5% UT (> 95% dip in UT) for 0.5 cycle.40% UT (60% dip in UT) for 5 cycles. 70% UT (30% dip in UT) for 25 cycles.< 5% UT (> 95% dip in UT) for 5 sec. < 5% UT (> 95% dip in UT) for 0.5 cycle.40% UT (60% dip in UT) for 5 cycles.",
            "metadata": {
                "document": "BIS Complete Monitoring System"
            }
        }
    ]);
  }