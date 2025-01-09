from Metricus import *
from Metricus.utilities import *
from utilities.list_units import *

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
      "result_example": 'Pascal',
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

def simple_conversion(unit_name: str, simpleValue: float, simpleFromUnit: str, simpleToUnit: str, rounded_result: bool) -> str:
  print(humanize_input(unit_name))
  print(humanize_input(simpleFromUnit))
  print(humanize_input(simpleToUnit))
  unit_converters = {
    'acceleration': acceleration_converter,
    'area': area_converter,
    'energy': energy_converter,
    'force': force_converter,
    'length': length_converter,
    'mass': mass_converter,
    'pressure': pressure_converter,
    'speed': speed_converter,
    'temperature': temperature_converter,
    'time': time_converter,
    'volume': volume_converter
  }

  converter = unit_converters.get(unit_name)

  if not converter:
    return {'fail': 'Unit not found.'}, 404

  return converter(simpleValue, simpleFromUnit, simpleToUnit, rounded_result=rounded_result, with_unit=True, humanized_input=True)

def complex_conversion(unit_name: str, firstValue: float, secondValue: float, resultUnit: str, fromUnitSelect: str, toUnitSelect: str, rounded_result: bool) -> str:
  unit_converters = {
    'calculate density': calculate_density,
    'calculate displacement': calculate_displacement,
    'calculate force': calculate_force,
    'calculate pressure': calculate_pressure,
  }

  converter = unit_converters.get(unit_name)

  if not converter:
    return {'fail': 'Unit not found.'}, 404

  return converter(firstValue, secondValue, humanize_input(resultUnit), humanize_input(fromUnitSelect), humanize_input(toUnitSelect), rounded_result=rounded_result, with_unit=True)
