from Metricus import *
from Metricus.utilities import *
from list_units import *

def get_datas(checked_id):
  data_mapping = {
    'calculate_density': {
      "complex_operation": True,
      "first_value": 'Mass',
      "second_value": 'Volume',
      "result_unit": 'Density',
      "from_unit": 'Mass',
      "to_unit": 'Volume',
      "result_example": 'kg/m³',
      "first_unit_examples": mass_units,
      "second_unit_examples": volume_units
    },
    'calculate_displacement': {
      "complex_operation": True,
      "first_value": 'Length',
      "second_value": 'Speed',
      "result_unit": 'Time',
      "result_example": 'Hour',
      "from_unit": 'Length',
      "to_unit": 'Speed',
      "first_unit_examples": length_units,
      "second_unit_examples": speed_units
    },
    'calculate_pressure': {
      "complex_operation": True,
      "first_value": 'Force',
      "second_value": 'Area',
      "result_unit": 'Pressure',
      "result_example": 'Atmosphere',
      "from_unit": 'Force',
      "to_unit": 'Area',
      "first_unit_examples": force_units,
      "second_unit_examples": area_units
    },
    'calculate_force': {
      "complex_operation": True,
      "first_value": 'Mass',
      "second_value": 'Acceleration',
      "result_unit": 'Force',
      "result_example": 'Newton',
      "from_unit": 'Mass',
      "to_unit": 'Acceleration',
      "first_unit_examples": mass_units,
      "second_unit_examples": acceleration_units
    },
    'acceleration': {
      "from_unit_example": 'Gravity',
      "to_unit_example": 'Meter per second squared'
    },
    'area': {
      "from_unit_example": 'Square kilometer',
      "to_unit_example": 'Hectare'
    },
    'energy': {
      "from_unit_example": 'BTU',
      "to_unit_example": 'Joule'
    },
    'force': {
      "from_unit_example": 'Newton',
      "to_unit_example": 'Dyne'
    },
    'length': {
      "from_unit_example": 'Kilometer',
      "to_unit_example": 'Mile'
    },
    'mass': {
      "from_unit_example": 'Kilogram',
      "to_unit_example": 'Tonne'
    },
    'pressure': {
      "from_unit_example": 'Pascal',
      "to_unit_example": 'Atmosphere'
    },
    'speed': {
      "from_unit_example": 'Knots',
      "to_unit_example": 'Miles per hour'
    },
    'temperature': {
      "from_unit_example": 'Celsius',
      "to_unit_example": 'Kelvin'
    },
    'time': {
      "from_unit_example": 'Day',
      "to_unit_example": 'Week'
    },
    'volume': {
      "from_unit_example": 'Liter',
      "to_unit_example": 'Cup'
    },
  }

  return data_mapping.get(checked_id, None)
