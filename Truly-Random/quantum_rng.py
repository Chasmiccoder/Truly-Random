"""
Usage of this module:
=====================







"""


from qiskit import QuantumCircuit, ClassicalRegister, QuantumRegister, execute, Aer
import math


def binary_to_decimal( binary_string ):
    """
    Takes a binary number (as a string) and returns its decimal equivalent
    """

    decimal = 0
    for i in range( len( binary_string ) ):
        decimal += 2**i * int( binary_string[-i-1] )

    return decimal


def print_quantum_circuit():
    """
    Prints the quantum circuit that simulates the coin toss
    """

    q = QuantumRegister(1)
    c = ClassicalRegister(1)

    qc = QuantumCircuit(q,c)

    qc.h( q[0] )
    qc.measure( q,c )

    backend = Aer.get_backend("qasm_simulator")

    job_sim = execute ( qc, backend, shots = 1 ) 
    
    print( qc )


def random_coin_toss():
    """
    This function simulates a perfectly random coin toss (when run on a quantum processor)
    Returns either 0 or 1 with exactly 50% probability of either event occuring
    """

    q = QuantumRegister(1)
    c = ClassicalRegister(1)

    qc = QuantumCircuit(q,c)

    qc.h( q[0] )
    qc.measure( q,c )

    backend = Aer.get_backend("qasm_simulator")

    job_sim = execute ( qc, backend, shots = 1 ) 
    sim_result = job_sim.result()

    # counts is {'1': 1} or {'0': 1}
    counts = sim_result.get_counts( qc )
     
    # At this point, we have simulated a perfectly random coin toss
    toss_outcome = int( list(counts.keys())[0] )

    return toss_outcome


def rand_n_digit_binary( n ):
    """
    Returns a randomly generated n digit binary number
    """

    binary = ""
    for i in range( n ):
        coin_toss = random_coin_toss()
        binary += str( coin_toss )

    return binary


def rand_digit():
    """
    Returns a random digit from [0,9]
    """

    # Obtain a random digit from 0 to 15 (1111 is 15 in binary)
    binary = rand_n_digit_binary( 4 )

    # loop until we obtain a random number that is lesser than 10
    while ( binary_to_decimal(binary) >= 10 ):
        binary = rand_n_digit_binary( 4 )
    
    # Now all that is left is an integer from [0,9]
    return binary_to_decimal( binary )


def rand( precision = 5 ):
    """
    Returns a random float value between 0 and 1
    precision = number of digits after the decimal point
    """

    random_float = ""

    for i in range( precision ):
        random_float += str( rand_digit() )    
    
    return float( "0." + random_float )


def rand_n_digit( n ):
    """
    Takes an integer n and returns an n digit, randomly generated number in base 10 (decimal)
    """

    random_number = ""
    for i in range( n ):
        randomDigit = rand_digit()

        if i == 0:
            while randomDigit == 0:
                randomDigit = rand_digit()

        random_number += str( randomDigit )

    return random_number


def rand_int( a,b, howMany = 1, precision = 20 ):
    """
    Returns a random integer value in the range of [a,b]
    precision = number of digits to be passed in rand()
    As the difference between a and b increases, precision must also increase (automate this later)
    """

    # Make sure that both ranges are integers
    a = int(a)
    b = int(b)

    randomNums = []
    for i in range(howMany):
        num = int( rand( precision ) * ( b - a ) ) + a
        randomNums += [num]

    return randomNums


def rand_float( a,b, precision = 5 ):
    """
    Returns a random float value in the range of [a,b]
    """

    # Make sure that both ranges are integers
    a = int(a)
    b = int(b)
    
    random_float = rand_int( a,b, precision ) +  rand( precision )

    # There is a chance that rand_int can return b. This condition retains the original range
    if ( random_float > b ):
        random_float -= 1
    
    return random_float
