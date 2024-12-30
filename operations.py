from Metricus import *
from Metricus.utilities import *
from list_units import *

def get_datas(checked_id):
  if checked_id == 'calculate_density':
    first_value = 'Mass'
    second_value = 'Volume'
    result_unit = 'Density'
    from_unit = 'Mass unit'
    to_unit = 'Volume unit'
    return {
      "first_value": first_value,
      "second_value": second_value,
      "result_unit": result_unit,
      "from_unit": from_unit,
      "to_unit": to_unit,
    }
  elif checked_id == 'calculate_displacement':
    first_value = 'Length'
    second_value = 'Speed'
    result_unit = 'Time'
    from_unit = 'Length unit'
    to_unit = 'Speed unit'
    return {
      "first_value": first_value,
      "second_value": second_value,
      "result_unit": result_unit,
      "from_unit": from_unit,
      "to_unit": to_unit,
    }
  elif checked_id == 'calculate_pressure':
    first_value = 'Mass'
    second_value = 'Acceleration'
    result_unit = 'Force'
    from_unit = 'Mass unit'
    to_unit = 'Acceleration unit'
    return {
      "first_value": first_value,
      "second_value": second_value,
      "result_unit": result_unit,
      "from_unit": from_unit,
      "to_unit": to_unit,
    }
  elif checked_id == 'calculate_force':
    first_value = 'Force'
    second_value = 'Area'
    result_unit = 'Force'
    from_unit = 'Force unit'
    to_unit = 'Area unit'
    return {
      "first_value": first_value,
      "second_value": second_value,
      "result_unit": result_unit,
      "from_unit": from_unit,
      "to_unit": to_unit,
    }
  else:
    return None  
  

