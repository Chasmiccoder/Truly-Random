"""


Usage:
Activate the virtual environment in which Qiskit has been installed
activate tf

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

    # There is some sort of bias, which forces future iterations to have some correlation with the first 
    # function call

    q = QuantumRegister(1)
    c = ClassicalRegister(1)

    qc = QuantumCircuit(q,c)

    qc.h( q[0] )
    qc.measure( q,c )

    backend = Aer.get_backend("qasm_simulator")

    job_sim = execute ( qc, backend, shots = 1 ) 
    sim_result = job_sim.result()

    counts = sim_result.get_counts( qc )
    # counts is {'1': 1} or {'0': 1} 

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


def rand_int( a,b, precision = 20 ):
    """
    Returns a random integer value in the range of [a,b]
    precision = number of digits to be passed in rand()
    As the difference between a and b increases, precision must also increase (automate this later)
    """

    # Make sure that both ranges are integers
    a = int(a)
    b = int(b)

    random_number = int( rand( precision ) * ( b - a ) ) + a

    return random_number


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


"""
Main
"""

# print( "Quantum Circuit:" )
# print_quantum_circuit()

# r = random_coin_toss()
# print( "Random Coin Toss: ", r )
# print()


# n = int(input("Enter Length of Binary Number: " ) )
# rb = rand_n_digit_binary( n )
# print( "Random n Digit Binary Number: ", rb)
# print()

# bn = input( "Enter Binary Number: " )
# print( "Decimal Equivalent: ", binary_to_decimal(bn) )
# print()

n = int( input( "Enter value of n: " ) )
print( "N Digit Decimal Number: ", rand_n_digit( n ) )
print()

print( "Random Number between 0 and 1: ", rand(n) )
print()

print( "Enter value for a: " )
a = int(input())
print( "Enter value for b: " )
b = int(input())
ans1 = rand_int(a,b)
ans2 = rand_float(a,b, 10)
print( "Random Integer between %d and %d: %d" %(a,b,ans1) )
print( "Random Float between %d and %d: %f" %(a,b,ans2) )


"""
Push all this to the project readme
Make note of all the requirements and project components (For example python version, flask version, etc)

Resources
https://qiskit.org/documentation/index.html


Other similar projects:
https://www.random.org/ (But uses Atmoshperic Noise)


"""